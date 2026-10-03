## HATCHDEV HATCHBOARD


Firebase RTDB rules
```
{
  "rules": {
    "posts": {
      ".read": "auth != null",
      ".indexOn": ["createdAt"],
      "$postId": {
        ".write": "auth != null &&
          (!data.exists() ||
           data.child('authorId').val() === auth.uid)",
        ".validate": "newData.hasChildren(
          ['text','authorId','authorName','createdAt'])
          && newData.child('text').isString()
          && newData.child('text').val().length <= 280
          && newData.child('authorId').val() === auth.uid"
      }
    }
  }
}
```


Add `VITE_FIREBASE_DATABASE_URL=your-firebase-rtdb-url` to your `.env` file