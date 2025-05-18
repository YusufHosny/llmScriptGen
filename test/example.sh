$content="`cat "$1"`"
curl -H "Content-Type: application/json" \
      -d "$content" \
      -X POST \
      http://localhost:3000/api/1/sections/1/script