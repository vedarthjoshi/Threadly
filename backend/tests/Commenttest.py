import requests

BASE = "http://127.0.0.1:5000/api"
EMAIL    = "testuser@example.com"
PASSWORD = "testpassword"

# 1) Login
login = requests.post(f"{BASE}/auth/login", json={"email": EMAIL, "password": PASSWORD})
assert login.status_code == 200, f"Login failed: {login.text}"
token = login.json()["token"]
headers = {"Authorization": f"Bearer {token}"}
print("✅ Logged in")

# 2) Create a thread to comment on
tres = requests.post(f"{BASE}/threads", json={
    "title": "Thread for Comments",
    "content": "Testing comments"
}, headers=headers)
assert tres.status_code == 201, f"Thread creation failed: {tres.text}"
thread_id = tres.json()["id"]
print("✅ Thread created:", thread_id)

# 3) Create comment (no author_id needed)
cres = requests.post(f"{BASE}/comments", json={
    "thread_id": thread_id,
    "content": "This is a test comment"
}, headers=headers)
assert cres.status_code == 201, f"Comment creation failed: {cres.text}"
comment_id = cres.json()["id"]
print("✅ Comment created:", comment_id)

# 4) Update comment
ures = requests.put(f"{BASE}/comments/{comment_id}", json={
    "content": "Updated comment"
}, headers=headers)
assert ures.status_code == 200, f"Comment update failed: {ures.text}"
print("✅ Comment updated")

# 5) Get comments for thread
gres = requests.get(f"{BASE}/comments/thread/{thread_id}", headers=headers)
assert gres.status_code == 200, f"Get comments failed: {gres.text}"
print("✅ Comments fetched:", gres.json())

# 6) Delete comment
dres = requests.delete(f"{BASE}/comments/{comment_id}", headers=headers)
assert dres.status_code == 200, f"Comment delete failed: {dres.text}"
print("✅ Comment deleted")
