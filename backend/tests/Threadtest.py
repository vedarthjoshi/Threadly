import requests

API_ROOT = "http://127.0.0.1:5000/api"
LOGIN_URL  = f"{API_ROOT}/auth/login"
THREAD_URL = f"{API_ROOT}/threads"

# Replace with your actual test user
EMAIL    = "harsh@gmail.com"
PASSWORD = "123456"

# 1️⃣ Login
login = requests.post(LOGIN_URL, json={"email": EMAIL, "password": PASSWORD})
assert login.status_code == 200, f"Login failed: {login.text}"
token = login.json()["token"]
headers = {"Authorization": f"Bearer {token}"}
print("✅ Logged in")

# 2️⃣ Create a thread
create = requests.post(THREAD_URL, json={
    "title": "Integration Test Thread",
    "content": "Testing update & delete"
}, headers=headers)
assert create.status_code == 201, f"Create failed: {create.text}"
thread_id = create.json()["id"]
print(f"✅ Thread created: {thread_id}")

# 3️⃣ Update the thread
update = requests.put(f"{THREAD_URL}/{thread_id}", json={
    "title": "Updated Title",
    "content": "Updated content"
}, headers=headers)
assert update.status_code == 200, f"Update failed: {update.text}"
print("✅ Thread updated")

# 4️⃣ Fetch to verify
fetch = requests.get(f"{THREAD_URL}/{thread_id}", headers=headers)
assert fetch.status_code == 200, f"Fetch failed: {fetch.text}"
data = fetch.json()
assert data["title"] == "Updated Title", "Title did not update"
assert data["content"] == "Updated content", "Content did not update"
print("✅ Update verified")

# 5️⃣ Delete the thread
delete = requests.delete(f"{THREAD_URL}/{thread_id}", headers=headers)
assert delete.status_code == 200, f"Delete failed: {delete.text}"
print("✅ Thread deleted")

# 6️⃣ Confirm deletion
confirm = requests.get(f"{THREAD_URL}/{thread_id}", headers=headers)
assert confirm.status_code == 404, "Thread still exists after delete"
print("✅ Deletion confirmed")
