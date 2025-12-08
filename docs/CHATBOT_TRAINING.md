# Chatbot Training Guide

Your chatbot is now equipped with **extensive Community of Christ knowledge**! Here's how it works and how to expand it further.

## ✅ What's Already Built

The chatbot now understands:

### **Beliefs & Theology**
- Core beliefs and mission
- Enduring Principles
- Scripture (Bible, Book of Mormon, D&C)
- Continuing revelation
- Inclusive priesthood
- Grace and worthiness

### **Practical Information**
- Service times and schedule
- Location and directions
- How to visit
- Getting involved
- Children and youth programs
- Giving options

### **Practices**
- Baptism
- Communion/Lord's Supper
- Worship style
- Sacraments

### **History**
- RLDS background
- Name change to Community of Christ
- Temple in Independence

### **Social Justice**
- Peace and justice mission
- LGBTQ+ inclusion
- Environmental stewardship
- Community outreach

## 📚 How to Add More Knowledge

### **Option 1: Add to Knowledge Base (Easiest)**

Edit `lib/chatbot-knowledge.ts` and add new entries:

```typescript
{
  keywords: ["your", "trigger", "words"],
  response: `Your detailed response here.

  Can include:
  • Bullet points
  • **Bold text**
  • Multiple paragraphs

  Link to pages for more info!`,
  category: "beliefs", // or "practices", "history", "practical", "scripture"
}
```

**Example - Adding info about small groups:**

```typescript
{
  keywords: ["small group", "groups", "fellowship group"],
  response: `**Small Groups at Minneapolis CoC:**

  We offer several small groups:

  📖 **Tuesday Night Bible Study** - 7:00 PM
  ☕ **Women's Coffee Group** - Saturdays 9:00 AM
  👨‍👩‍👧‍👦 **Young Families** - 2nd Sunday after worship

  Small groups are a great way to build deeper relationships and grow in faith.

  Contact: groups@minneapoliscofchrist.org`,
  category: "practical",
}
```

### **Option 2: Use Real AI (OpenAI/Claude)**

For more intelligent, conversational responses, integrate with AI APIs.

#### **Using OpenAI (ChatGPT)**

1. **Install OpenAI SDK:**
```bash
npm install openai
```

2. **Get API Key:**
   - Sign up at https://platform.openai.com
   - Create API key
   - Add to `.env.local`:
   ```
   OPENAI_API_KEY=sk-...
   ```

3. **Create API Route:**

```typescript
// app/api/chat/route.ts
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are a helpful assistant for Minneapolis Community of Christ congregation.

KEY INFORMATION:
- Location: 123 Main Street, Minneapolis, MN 55401
- Sunday Worship: 10:00 AM
- Wednesday Bible Study: 7:00 PM
- Phone: (612) 555-1234
- Email: info@minneapoliscofchrist.org

BELIEFS:
- Community of Christ (formerly RLDS)
- Mission: Proclaim Jesus Christ and promote communities of joy, hope, love, and peace
- Scripture: Bible, Book of Mormon, Doctrine and Covenants
- 9 Enduring Principles guide us
- Inclusive priesthood (women and men)
- LGBTQ+ affirming
- Peace and justice focus

Be warm, welcoming, and informative. Keep responses concise but helpful.`;

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return NextResponse.json({
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('OpenAI error:', error);
    return NextResponse.json(
      { error: 'Failed to get response' },
      { status: 500 }
    );
  }
}
```

4. **Update ChatBot Component:**

```typescript
// In handleSend function, replace the setTimeout with:
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: messageText }),
});

const data = await response.json();
const botMessage: Message = {
  id: messages.length + 2,
  text: data.response,
  sender: "bot",
  timestamp: new Date(),
};

setMessages((prev) => [...prev, botMessage]);
```

**Cost:** ~$0.0001-0.0005 per message (very affordable)

#### **Using Anthropic Claude**

Similar to OpenAI but using Claude API. Great for longer, more thoughtful responses.

```bash
npm install @anthropic-ai/sdk
```

### **Option 3: Advanced - RAG (Retrieval Augmented Generation)**

For the MOST accurate responses using your actual church documents:

#### **What is RAG?**
RAG finds relevant content from your documents and feeds it to AI for accurate, grounded responses.

#### **Setup:**

1. **Prepare Documents:**
   - Congregation history
   - Bylaws and policies
   - Pastor's sermons
   - Community of Christ resources
   - Newsletter archives

2. **Create Vector Database:**
```bash
npm install @pinecone-database/pinecone
npm install openai
```

3. **Index Your Content:**
```typescript
// scripts/index-documents.ts
import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAI } from 'openai';

// Convert documents to embeddings and store in Pinecone
// This creates a searchable knowledge base
```

4. **Query at Runtime:**
   - User asks question
   - Convert question to embedding
   - Find most relevant documents
   - Send documents + question to AI
   - AI generates accurate, sourced response

**Best for:**
- Large congregations with lots of content
- When accuracy is critical
- Historical archives and documents

**Cost:** Vector DB hosting + AI API costs (~$20-50/month)

## 🎯 Recommendations

### **Start Here (Already Done!)** ✅
- ✅ Comprehensive knowledge base with 20+ topics
- ✅ Easy to maintain and update
- ✅ Free (no API costs)
- ✅ Fast responses
- ✅ Works offline

### **Next Step (When Ready)**
- **Add OpenAI API** for natural conversation
  - More flexible responses
  - Better at understanding context
  - Can handle unexpected questions
  - Cost: ~$5-10/month for typical usage

### **Advanced (Future)**
- **RAG System** when you have:
  - Lots of documents to reference
  - Need sourced, accurate answers
  - Budget for hosting
  - Technical expertise

## 📝 Adding Training Data

### **Where to Find Community of Christ Content:**

1. **Official Resources:**
   - https://cofchrist.org
   - Herald magazine articles
   - Enduring Principles study guides
   - Doctrine and Covenants

2. **Local Content:**
   - Your congregation's history
   - Pastor's sermons
   - Newsletter archives
   - Member testimonies

3. **How to Add It:**

**Manual Entry (Current Method):**
```typescript
// Add to lib/chatbot-knowledge.ts
{
  keywords: ["herald", "magazine", "newsletter"],
  response: `We share articles from the Herald magazine...`,
  category: "practical",
}
```

**Using AI to Generate (Future):**
- Give AI your documents
- Ask it to create Q&A pairs
- Add to knowledge base

## 🔧 Customization Tips

### **Make it More Personal:**

```typescript
{
  keywords: ["pastor", "minister", "priest"],
  response: `**Our Pastoral Team:**

  🙏 **Pastor Jane Smith** - Lead Pastor
     Email: pastor@minneapoliscofchrist.org

  📖 **Elder John Miller** - Associate
     Focus: Youth Ministry

  💒 **Elder Sarah Johnson** - Evangelist
     Focus: Outreach & Mission

  We're here to support your spiritual journey!`,
  category: "practical",
}
```

### **Add Seasonal Content:**

```typescript
{
  keywords: ["advent", "christmas", "lent", "easter"],
  response: `**This Advent Season:**

  🕯️ Advent Candle Lighting - Sundays in December
  🎄 Christmas Eve Service - Dec 24, 7:00 PM
  🎁 Giving Tree - Support local families

  Join us as we prepare for Christ's coming!`,
  category: "practical",
}
```

### **Link to Web Pages:**

```typescript
response: `Learn more at our [Events Page](/connect/events) or [Give Page](/give).`
```

## 📊 Testing Your Chatbot

Try these questions to test coverage:

- ✅ "What does Community of Christ believe?"
- ✅ "When are services?"
- ✅ "Tell me about baptism"
- ✅ "What's the Book of Mormon?"
- ✅ "Are women ordained?"
- ✅ "How can I volunteer?"
- ✅ "Tell me about the temple"
- ✅ "What are the Enduring Principles?"

Add more knowledge for any gaps you find!

## 💡 Pro Tips

1. **Use Natural Language:** Write responses conversationally
2. **Include Next Steps:** Always guide users to contact info or pages
3. **Keep it Concise:** Break up long responses with bullets
4. **Update Regularly:** Add new events, programs, and info
5. **Test Frequently:** Try questions newcomers might ask

## 🚀 Future Enhancements

- [ ] Add voice input/output
- [ ] Integrate with calendar for event queries
- [ ] Multi-language support
- [ ] Member login for personalized responses
- [ ] Analytics to see common questions

---

**Questions?** The chatbot knowledge base is in `lib/chatbot-knowledge.ts` - edit freely!

**Remember:** The best chatbot is one that's regularly updated with current, accurate information about YOUR congregation. Start simple and expand as needed!
