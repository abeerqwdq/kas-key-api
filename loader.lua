local HttpService = game:GetService("HttpService")

-- 🔹 CONFIG: your key and kathub script URLs
local KEY = "TESTKEY123"  -- Firebase document ID
local KATHUB_SCRIPTS = {
    "https://raw.githubusercontent.com/abeerqwdq/kathub/refs/heads/main/apv1",
    "https://raw.githubusercontent.com/abeerqwdq/kathub/refs/heads/main/autohit"
}

-- 🔹 Generate a consistent HWID for this executor
-- This can be any unique string per device; for simplicity:
local HWID = game:GetService("RbxAnalyticsService"):GetClientId() or "UNKNOWN_HWID"

-- 🔹 API endpoint
local API_URL = "https://kas-key-api.vercel.app/api/check?key="..KEY.."&hwid="..HWID

-- 🔹 Call the API
local success, response = pcall(function()
    return game:HttpGet(API_URL)
end)

if not success then
    warn("❌ Failed to contact API:", response)
    return
end

-- 🔹 Debug: show raw API response
print("API Response:", response)

-- 🔹 Decode JSON
local data
local decodeSuccess, decodeResult = pcall(function()
    return HttpService:JSONDecode(response)
end)

if decodeSuccess then
    data = decodeResult
else
    warn("❌ Failed to decode JSON:", decodeResult)
    return
end

-- 🔹 Handle API response
if data.ok then
    print("✅ AUTH OK: Key and HWID valid!")

    -- 🔹 Load all kathub scripts
    for _, scriptUrl in ipairs(KATHUB_SCRIPTS) do
        local loadSuccess, err = pcall(function()
            loadstring(game:HttpGet(scriptUrl))()
        end)
        if not loadSuccess then
            warn("❌ Failed to load script:", scriptUrl, err)
        else
            print("✅ Loaded script:", scriptUrl)
        end
    end

elseif data.reason == "HWID mismatch" and HWID ~= "" then
    warn("❌ HWID mismatch. Make sure this executor matches the one registered in Firebase.")
elseif data.reason == "Bad key" then
    warn("❌ Invalid key.")
else
    warn("❌ AUTH FAILED:", data.reason or "Unknown reason")
end
