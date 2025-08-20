# Sanity CORS Setup

If you're getting CORS errors, follow these steps:

1. **Go to Sanity Management Console**:
   https://www.sanity.io/manage/project/w41634kr/api

2. **Navigate to API → CORS Origins**

3. **Add these origins** (one per line):
   ```
   http://localhost:3000
   https://tylerschmidt-v3.vercel.app
   https://*.vercel.app
   https://tylerschmidt.com
   https://www.tylerschmidt.com
   ```

4. **Check "Allow credentials"** for each origin

5. **Save changes**

## Also Check Dataset Visibility

1. Go to **Datasets** tab
2. Make sure "production" dataset is set to **"Public"**
3. If it's "Private", change it to "Public"

This allows your website to fetch content without authentication.
