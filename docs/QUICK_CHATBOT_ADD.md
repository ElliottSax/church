# Quick Guide: Adding Chatbot Knowledge

## 🚀 Add New Topics in 3 Steps

### 1. Open the Knowledge File
```bash
lib/chatbot-knowledge.ts
```

### 2. Find the `knowledgeBase` Array

Look for:
```typescript
export const knowledgeBase: KnowledgeItem[] = [
```

### 3. Add Your Entry

Copy this template and fill it in:

```typescript
{
  keywords: ["word1", "word2", "phrase"],
  response: `Your response here.

  Use **bold** for emphasis.
  Use bullet points:
  • Point 1
  • Point 2

  Include contact info or links!`,
  category: "practical",
},
```

## 📋 Real Examples

### Example 1: Adding a New Program

```typescript
{
  keywords: ["men's group", "men's ministry", "guys"],
  response: `**Men's Ministry:**

  🔥 **Friday Morning Men's Group**
  When: Fridays 6:30 AM
  Where: Fellowship Hall
  What: Coffee, breakfast, and Bible study

  Contact: mensgroup@minneapoliscofchrist.org

  All men are welcome!`,
  category: "practical",
},
```

### Example 2: Special Event

```typescript
{
  keywords: ["vacation bible school", "vbs", "summer camp"],
  response: `**Vacation Bible School 2025**

  📅 July 14-18, 2025
  ⏰ 9:00 AM - 12:00 PM
  👧👦 Ages 4-12

  Theme: "Totally Awesome God"

  Register: vbs@minneapoliscofchrist.org
  Cost: FREE! (donations welcome)

  Help needed! Contact us to volunteer.`,
  category: "practical",
},
```

### Example 3: Theology Question

```typescript
{
  keywords: ["trinity", "godhead", "father son holy spirit"],
  response: `**Our Understanding of God:**

  Community of Christ affirms the Christian understanding of God as Trinity - Father, Son (Jesus Christ), and Holy Spirit.

  We believe:
  • God is love
  • Jesus Christ reveals God's nature
  • The Holy Spirit guides and empowers us
  • God is actively present in the world

  We focus on experiencing God's love rather than rigid theological definitions.`,
  category: "beliefs",
},
```

## 🎯 Categories

Choose the right category:

- `"beliefs"` - Theology, doctrine, faith
- `"practices"` - Worship, sacraments, rituals
- `"practical"` - Times, location, contact, programs
- `"history"` - Church history, RLDS, background
- `"scripture"` - Bible, Book of Mormon, D&C

## ✅ Tips for Good Keywords

**Good Keywords:**
```typescript
keywords: ["youth", "teens", "teenagers", "young people"]
```

**Better Keywords (include variations):**
```typescript
keywords: ["youth group", "youth ministry", "teens", "teenagers",
          "high school", "middle school", "young people"]
```

## 🧪 Test Your Changes

1. Save the file
2. Restart dev server (`npm run dev`)
3. Open chatbot
4. Try your keywords
5. Verify response appears correctly

## 📝 Formatting Tips

### Use Line Breaks
```typescript
response: `First paragraph.

Second paragraph with space above.`
```

### Use Emojis (Sparingly)
```typescript
response: `🎉 Special Event!
📅 Date: Sunday
📍 Location: Main Hall`
```

### Include Links
```typescript
response: `Learn more on our [Events Page](/connect/events).

Or contact us: info@minneapoliscofchrist.org`
```

### Bold Important Info
```typescript
response: `**Important:** Registration required by Friday.

**Contact:** pastor@minneapoliscofchrist.org`
```

## ⚠️ Common Mistakes

❌ **Missing comma:**
```typescript
{
  keywords: ["test"],
  response: "Test response"
}  // ← Missing comma before next item!
{
  keywords: ["next"],
```

✅ **Correct:**
```typescript
{
  keywords: ["test"],
  response: "Test response",
  category: "practical",
},  // ← Comma here!
{
  keywords: ["next"],
```

❌ **Using single quotes in response:**
```typescript
response: 'This won't work because of apostrophes!'
```

✅ **Use backticks:**
```typescript
response: `This works perfectly! Apostrophes, quotes, everything.`
```

## 🔄 Quick Update Workflow

1. **Identify gap:** Notice chatbot can't answer something
2. **Add knowledge:** Edit `lib/chatbot-knowledge.ts`
3. **Test:** Try it in the chatbot
4. **Iterate:** Refine response if needed
5. **Done!** ✨

## 📞 Common Topics to Add

- Special events (VBS, retreats, conferences)
- Seasonal services (Christmas, Easter, Thanksgiving)
- New programs or ministries
- Staff changes
- Building information
- Parking/accessibility details
- COVID policies
- Membership process
- Wedding/funeral policies
- Frequently asked questions

## 💾 Save and Deploy

After editing:

```bash
# Commit changes
git add lib/chatbot-knowledge.ts
git commit -m "Update chatbot knowledge"
git push

# If deployed on Vercel, it auto-deploys!
```

---

**That's it!** Adding knowledge is that simple. The more you add, the smarter your chatbot becomes! 🤖✨
