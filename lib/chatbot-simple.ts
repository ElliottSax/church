// Simplified chatbot for better performance
interface SimpleResponse {
  response: string;
  followUp?: string[];
}

const quickResponses: { [key: string]: SimpleResponse } = {
  worship: {
    response: `**Worship Services**

Join us every Sunday at 10:30 AM for worship!

We also have:
• Friday Bible Study at 7:00 PM
• Youth programs on Saturdays
• Prayer groups throughout the week

Our services feature uplifting music, inspiring messages, and warm fellowship. Everyone is welcome!

📍 Location: 123 Main Street, Minneapolis, MN 55401
📞 Call: (612) 555-1234`,
    followUp: ["What should I expect?", "Tell me about Bible study", "How do I get there?"]
  },

  beliefs: {
    response: `**Our Beliefs**

Community of Christ is guided by 9 Enduring Principles:
• Grace and Generosity
• Sacredness of Creation
• Continuing Revelation
• Worth of All Persons
• All Are Called
• Responsible Choices
• Blessings of Community
• Unity in Diversity
• Mission and Witness

We follow Jesus Christ and believe in God's unconditional love for all people. Our mission: "We proclaim Jesus Christ and promote communities of joy, hope, love, and peace."`,
    followUp: ["Tell me about RLDS", "Who is your Prophet?", "How are you different from LDS?"]
  },

  rlds: {
    response: `**About Community of Christ (formerly RLDS)**

Community of Christ was known as the Reorganized Church of Jesus Christ of Latter Day Saints (RLDS) until 2001. We're part of the Restoration movement that began in 1830.

Key points:
• Founded by Joseph Smith III in 1860
• Always rejected polygamy
• Ordain women since 1984
• Prophet-President: Stassi D. Cramm
• Headquarters: Independence, Missouri

We're different from the LDS (Mormon) church - we never went to Utah, never practiced polygamy, and have different scriptures and beliefs.`,
    followUp: ["Tell me about Joseph Smith III", "What about the Book of Mormon?", "Tell me more differences from LDS"]
  },

  visit: {
    response: `**Visiting Community of Christ Minneapolis**

We'd love to see you! Here's what to expect:
• Casual, welcoming atmosphere
• Service lasts about 1 hour
• Come as you are - no dress code
• Children are welcome
• Coffee and fellowship after service

**Location:** 123 Main Street, Minneapolis, MN 55401
**Sunday Worship:** 10:30 AM
**Friday Bible Study:** 7:00 PM

Questions? Call us at (612) 555-1234 or just drop by!`,
    followUp: ["What happens during worship?", "Do you have children's programs?", "How do I get involved?"]
  }
};

export function getSimpleResponse(query: string): SimpleResponse {
  const q = query.toLowerCase();

  // Check for key topics
  if (q.includes('worship') || q.includes('service') || q.includes('sunday') || q.includes('time')) {
    return quickResponses.worship;
  }

  if (q.includes('belief') || q.includes('principle') || q.includes('mission') || q.includes('faith')) {
    return quickResponses.beliefs;
  }

  if (q.includes('rlds') || q.includes('history') || q.includes('mormon') || q.includes('lds') || q.includes('joseph smith')) {
    return quickResponses.rlds;
  }

  if (q.includes('visit') || q.includes('location') || q.includes('where') || q.includes('address')) {
    return quickResponses.visit;
  }

  // Default response
  return {
    response: `I'm the Minneapolis Community of Christ chatbot, here to help answer your questions!

I can tell you about:
• **Worship times** - Sunday 10:30 AM
• **Our beliefs** - 9 Enduring Principles
• **Church history** - RLDS/Restoration movement
• **Visiting us** - What to expect

What would you like to know?`,
    followUp: ["When is worship?", "Tell me about your beliefs", "What is RLDS?", "I'd like to visit"]
  };
}