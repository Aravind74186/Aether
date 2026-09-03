import http from "http";

const BASE_URL = "http://localhost:3000";

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = options.headers || {};
  if (options.body && typeof options.body === "object") {
    options.body = JSON.stringify(options.body);
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body,
    redirect: options.redirect || "manual",
  });

  let data = null;
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  return {
    status: res.status,
    headers: res.headers,
    data,
  };
}

async function runTests() {
  console.log("=== AETHER BLOG & ADMIN SYSTEM VERIFICATION ===\n");
  let passed = 0;
  let failed = 0;

  function assert(name, condition, details = "") {
    if (condition) {
      console.log(`[PASS] ${name}`);
      passed++;
    } else {
      console.error(`[FAIL] ${name} - ${details}`);
      failed++;
    }
  }

  try {
    // 1. Unauthenticated /admin page redirect
    const adminCheck = await request("/admin");
    assert(
      "Unauthenticated /admin redirects to /admin/login",
      adminCheck.status === 307 || adminCheck.status === 302 || (adminCheck.headers.get("location") || "").includes("/admin/login"),
      `Got status: ${adminCheck.status}, location: ${adminCheck.headers.get("location")}`
    );

    // 2. Unauthenticated API access rejected
    const unauthApi = await request("/api/admin/posts");
    assert(
      "Unauthenticated /api/admin/posts returns 401 Unauthorized",
      unauthApi.status === 401,
      `Got status: ${unauthApi.status}`
    );

    // 3. Brute force / invalid password rejection with generic message
    const badLogin = await request("/api/admin/login", {
      method: "POST",
      body: { email: "admin@aethertech.com", password: "wrongpassword123" },
    });
    assert(
      "Invalid login returns 401 with generic error message",
      badLogin.status === 401 && badLogin.data?.error === "Invalid email or password.",
      `Got: ${JSON.stringify(badLogin.data)}`
    );

    // 4. Valid Admin Login
    const validLogin = await request("/api/admin/login", {
      method: "POST",
      body: { email: "admin@aethertech.com", password: "AetherAdmin@2025Secure" },
    });

    const setCookie = validLogin.headers.get("set-cookie") || "";
    const hasSessionCookie = setCookie.includes("aether_admin_session=");
    assert(
      "Admin login succeeds and sets HTTP-only session cookie",
      validLogin.status === 200 && validLogin.data?.success === true && hasSessionCookie,
      `Status: ${validLogin.status}, Cookie: ${setCookie}`
    );

    const sessionMatch = setCookie.match(/aether_admin_session=([^;]+)/);
    const sessionCookieHeader = sessionMatch ? `aether_admin_session=${sessionMatch[1]}` : "";

    // 5. Authenticated /api/admin/posts access
    const authPosts = await request("/api/admin/posts", {
      headers: { Cookie: sessionCookieHeader },
    });
    assert(
      "Authenticated admin can list posts",
      authPosts.status === 200 && Array.isArray(authPosts.data?.posts),
      `Status: ${authPosts.status}, Count: ${authPosts.data?.posts?.length}`
    );

    // 6. Create Draft Post
    const testSlug = `test-draft-post-${Date.now()}`;
    const createDraft = await request("/api/admin/posts", {
      method: "POST",
      headers: { Cookie: sessionCookieHeader },
      body: {
        title: "Test Draft Verification Article",
        slug: testSlug,
        excerpt: "Draft article testing verification",
        content: "## Testing Draft Visibility\nThis is a draft post that should not be visible to public.",
        status: "DRAFT",
      },
    });
    const createdPost = createDraft.data?.post;
    assert(
      "Admin can create a DRAFT post",
      createDraft.status === 201 && createdPost?.status === "DRAFT",
      `Status: ${createDraft.status}`
    );

    // 7. Verify Draft Post is NOT accessible publicly (returns 404)
    const publicDraftCheck = await request(`/blog/${testSlug}`);
    assert(
      "DRAFT post is hidden and returns 404 on public /blog/[slug]",
      publicDraftCheck.status === 404,
      `Got status: ${publicDraftCheck.status} instead of 404`
    );

    // 8. Publish the post
    if (createdPost?.id) {
      const publishRes = await request(`/api/admin/posts/${createdPost.id}/publish`, {
        method: "POST",
        headers: { Cookie: sessionCookieHeader },
      });
      assert(
        "Admin can PUBLISH a post",
        publishRes.status === 200 && publishRes.data?.post?.status === "PUBLISHED",
        `Status: ${publishRes.status}`
      );

      // 9. Verify Published post is now accessible publicly (200)
      const publicPublishedCheck = await request(`/blog/${testSlug}`);
      assert(
        "PUBLISHED post is accessible publicly on /blog/[slug]",
        publicPublishedCheck.status === 200,
        `Got status: ${publicPublishedCheck.status}`
      );

      // 10. Unpublish post back to DRAFT
      const unpublishRes = await request(`/api/admin/posts/${createdPost.id}/unpublish`, {
        method: "POST",
        headers: { Cookie: sessionCookieHeader },
      });
      assert(
        "Admin can UNPUBLISH post back to DRAFT",
        unpublishRes.status === 200 && unpublishRes.data?.post?.status === "DRAFT",
        `Status: ${unpublishRes.status}`
      );

      // 11. Delete test post
      const deleteRes = await request(`/api/admin/posts/${createdPost.id}`, {
        method: "DELETE",
        headers: { Cookie: sessionCookieHeader },
      });
      assert(
        "Admin can delete post",
        deleteRes.status === 200 && deleteRes.data?.success === true,
        `Status: ${deleteRes.status}`
      );
    }

    // 12. Permanent 308 redirect from /insights to /blog
    const redirectCheck = await request("/insights");
    assert(
      "Permanent 308 redirect from /insights to /blog",
      redirectCheck.status === 308 && (redirectCheck.headers.get("location") || "").endsWith("/blog"),
      `Status: ${redirectCheck.status}, Location: ${redirectCheck.headers.get("location")}`
    );

    // 13. Admin Logout
    const logoutRes = await request("/api/admin/logout", {
      method: "POST",
      headers: { Cookie: sessionCookieHeader },
    });
    const logoutCookie = logoutRes.headers.get("set-cookie") || "";
    assert(
      "Admin logout clears session cookie",
      logoutRes.status === 200 && (logoutCookie.toLowerCase().includes("max-age=0") || logoutCookie.toLowerCase().includes("expires=")),
      `Status: ${logoutRes.status}, Cookie: ${logoutCookie}`
    );

    console.log(`\n=== TEST RESULTS: ${passed} PASSED, ${failed} FAILED ===\n`);
  } catch (err) {
    console.error("Test execution error:", err);
  }
}

runTests();
