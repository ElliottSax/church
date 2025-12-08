/**
 * Community of Christ Knowledge Base
 * This file contains the chatbot's knowledge about Community of Christ
 */

export interface KnowledgeItem {
  keywords: string[];
  response: string;
  category: "beliefs" | "practices" | "history" | "practical" | "scripture";
}

export const knowledgeBase: KnowledgeItem[] = [
  // BELIEFS
  {
    keywords: ["believe", "belief", "beliefs", "faith", "doctrine"],
    response: `Community of Christ believes in:

• **Jesus Christ** as Savior and the living expression of God's love
• **Grace and Love** extended to all people
• **Worth of All Persons** - We affirm the worth of all people before God
• **Peace and Justice** - We work actively for peace and justice
• **Sacraments** - Baptism and the Lord's Supper as sacred expressions of faith

We embrace the Bible, Book of Mormon, and Doctrine and Covenants as scripture. Our mission is to proclaim Jesus Christ and promote communities of joy, hope, love, and peace.

Learn more at our About page or cofchrist.org/beliefs`,
    category: "beliefs",
  },
  {
    keywords: ["rlds", "reorganized", "history", "founded"],
    response: `Community of Christ was formerly known as the Reorganized Church of Jesus Christ of Latter Day Saints (RLDS). We reorganized in 1860 under Joseph Smith III and changed our name to Community of Christ in 2001.

Our Minneapolis congregation has served the community for over 75 years, staying true to our heritage while embracing God's call to be a prophetic people focused on Christ's mission of peace and justice.`,
    category: "history",
  },
  {
    keywords: ["enduring principles", "principles"],
    response: `Community of Christ is guided by 9 Enduring Principles:

1. Grace and Generosity
2. Sacredness of Creation
3. Continuing Revelation
4. Worth of All Persons
5. All Are Called
6. Responsible Choices
7. Blessings of Community
8. Mission and Witness
9. Unity in Diversity

These principles help us live out Christ's mission in today's world.`,
    category: "beliefs",
  },

  // PRACTICES & WORSHIP
  {
    keywords: ["service", "worship", "time", "times", "sunday", "when"],
    response: `**Worship Times:**

🕐 **Sunday Worship**: 10:00 AM
   Traditional service with communion (1st Sunday of month)

📖 **Wednesday Bible Study**: 7:00 PM
   In-depth scripture study and discussion

🙏 **Thursday Prayer Group**: 6:30 PM
   Community prayer and spiritual support

**Location**: 123 Main Street, Minneapolis, MN 55401

All are welcome! We offer both in-person and online attendance.`,
    category: "practical",
  },
  {
    keywords: ["communion", "sacrament", "lord's supper"],
    response: `We celebrate the Lord's Supper (communion) on the first Sunday of each month. All who seek to follow Christ are welcome to participate, regardless of age or church membership.

We use bread and grape juice, and communion is served by our priesthood members. It's a sacred time of remembering Christ's sacrifice and experiencing community.`,
    category: "practices",
  },
  {
    keywords: ["baptism", "baptize", "baptized"],
    response: `Community of Christ practices baptism by immersion for those who are 8 years or older and choose to follow Christ. We believe baptism is a personal choice and expression of faith.

Baptism represents dying to sin and rising to new life in Christ. If you're interested in baptism, please speak with our pastor or contact us at (612) 555-1234.`,
    category: "practices",
  },
  {
    keywords: ["priesthood", "ordination", "women priests"],
    response: `Community of Christ has an inclusive priesthood that welcomes both women and men. We were one of the first Christian denominations to ordain women to all offices of priesthood.

Priesthood is a calling to servant ministry, not a position of power. All members are called to ministry, and some are set apart through ordination for specific responsibilities.`,
    category: "practices",
  },

  // SCRIPTURE & THEOLOGY
  {
    keywords: ["book of mormon", "scripture", "bible"],
    response: `Community of Christ uses three books of scripture:

📖 **The Bible** (Old and New Testaments)
📖 **Book of Mormon** - Another testament of Jesus Christ
📖 **Doctrine and Covenants** - Revelations to the church

We interpret scripture through the lens of Jesus Christ and believe in continuing revelation. Scripture guides us in faithful discipleship and understanding God's will.`,
    category: "scripture",
  },
  {
    keywords: ["revelation", "prophet", "president"],
    response: `Community of Christ believes in continuing revelation - that God still speaks to the church today through our Prophet-President and the inspiration of the Holy Spirit.

Our current President is Stephen M. Veazey. Revelations are presented to the World Conference for consideration and sustaining vote by the whole church.

We believe God's voice can be heard through scripture, nature, community discernment, and personal experience.`,
    category: "beliefs",
  },

  // PRACTICAL INFORMATION
  {
    keywords: ["location", "address", "where", "directions"],
    response: `📍 **Minneapolis Community of Christ**
123 Main Street
Minneapolis, MN 55401

🚗 **Parking**: Free lot behind the building + street parking
🚌 **Transit**: Bus routes 6 & 17, Green Line to Nicollet Mall (2 blocks)
♿ **Accessibility**: Fully accessible with designated parking

📞 Phone: (612) 555-1234
✉️ Email: info@minneapoliscofchrist.org

Visit our Location page for an interactive map and detailed directions!`,
    category: "practical",
  },
  {
    keywords: ["visit", "visiting", "newcomer", "new", "first time"],
    response: `**Welcome! We'd love to have you visit!**

When you arrive:
• Greeters at the door will welcome you
• No dress code - come as you are
• Service is about 1 hour
• Coffee and fellowship after worship
• Nursery and children's programs available

**New Member Orientation** is the first Sunday of each month after worship. No pressure to join - just come and see if we're a good fit!

Questions? Call (612) 555-1234 or email info@minneapoliscofchrist.org`,
    category: "practical",
  },
  {
    keywords: ["give", "donate", "donation", "offering", "tithe"],
    response: `**Ways to Give:**

💻 **Online Giving**: Visit our Give page
📬 **Mail**: Send checks to 123 Main Street, Minneapolis, MN 55401
🏛️ **In Person**: Offering plates during worship
📱 **Text to Give**: Coming soon!

Your generosity supports:
• Worship and ministry programs
• Community outreach
• Building maintenance
• Mission projects

All donations are tax-deductible. We're grateful for your support!`,
    category: "practical",
  },
  {
    keywords: ["volunteer", "serve", "help", "get involved"],
    response: `**Ways to Get Involved:**

🤝 **Worship Team**: Music, greeters, communion servers
👥 **Small Groups**: Bible study, fellowship groups
🍽️ **Community Meals**: Help serve monthly meals
📦 **Outreach**: Food shelf, shelter support
👶 **Children's Ministry**: Teachers, helpers
🎓 **Youth Ministry**: Mentors, activity leaders

Visit our Give/Volunteer page or contact us at (612) 555-1234 to find where your gifts can make a difference!`,
    category: "practical",
  },
  {
    keywords: ["children", "kids", "youth", "young"],
    response: `**Children & Youth Programs:**

👶 **Nursery**: Birth-3 years (during worship)
📚 **Children's Church**: Ages 4-11 (engaging lessons)
🎯 **Youth Group**: Ages 12-18 (Sundays 5-7 PM)

**Special Activities:**
• Vacation Bible School (summer)
• Youth mission trips
• Service projects
• Camp (summer residential program)
• Monthly youth events

All leaders are background-checked and trained. We create safe, nurturing spaces for spiritual growth!`,
    category: "practical",
  },

  // SOCIAL JUSTICE & MISSION
  {
    keywords: ["peace", "justice", "mission", "outreach", "social"],
    response: `Community of Christ is deeply committed to peace, justice, and caring for creation. We actively:

✊ **Pursue Peace**: Work for nonviolent conflict resolution
🌍 **Promote Justice**: Advocate for human rights and dignity
🌱 **Care for Creation**: Environmental stewardship
🤝 **Serve Communities**: Food shelves, homeless shelters, disaster relief

Our Minneapolis congregation:
• Monthly food shelf volunteering
• Homeless shelter support
• Community meals (3rd Thursday)
• Justice advocacy partnerships

Want to join us in mission? Check our Connect page!`,
    category: "beliefs",
  },
  {
    keywords: ["lgbt", "lgbtq", "gay", "inclusive", "inclusion"],
    response: `Community of Christ affirms the worth of ALL persons. Our international church continues to discern questions of human sexuality, and our local congregation strives to be a welcoming community for all people.

We believe:
• All people are of sacred worth
• God's love has no boundaries
• The Holy Spirit continues to reveal truth
• Unity doesn't require uniformity

Questions about our community? Please contact our pastor or visit to experience our welcoming fellowship.`,
    category: "beliefs",
  },

  // TEMPLE
  {
    keywords: ["temple", "independence"],
    response: `The Community of Christ Temple is located in Independence, Missouri (our world headquarters). Dedicated in 1994, it's a house of prayer and education for all people.

The Temple offers:
• Daily prayer services
• Peaceful meditation spaces
• Spiritual formation programs
• Beautiful architecture and art

While we don't have a temple in Minneapolis, we're connected to this sacred space and its mission of peace. Many congregation members have visited for retreats and spiritual renewal.`,
    category: "history",
  },

  // DEFAULT RESPONSES
  {
    keywords: ["thank", "thanks", "appreciate"],
    response: `You're welcome! We're here to help. Feel free to ask more questions, or contact us directly:

📞 (612) 555-1234
✉️ info@minneapoliscofchrist.org

Blessings to you!`,
    category: "practical",
  },
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response: `Hello! Welcome to Minneapolis Community of Christ. I'm here to answer your questions about our congregation, beliefs, and Community of Christ.

What would you like to know?`,
    category: "practical",
  },
];

/**
 * Find the best matching response for a query
 */
export function findBestMatch(query: string): string {
  const normalizedQuery = query.toLowerCase();

  // Look for keyword matches
  for (const item of knowledgeBase) {
    for (const keyword of item.keywords) {
      if (normalizedQuery.includes(keyword)) {
        return item.response;
      }
    }
  }

  // Default response if no match
  return `I'd be happy to help! Here are some things I can answer:

• **Beliefs**: What does Community of Christ believe?
• **Worship**: When are services?
• **Location**: Where are you located?
• **Getting Involved**: How can I help?
• **Children & Youth**: What programs do you offer?
• **Scripture**: What do you use?

Or contact us directly:
📞 (612) 555-1234
✉️ info@minneapoliscofchrist.org`;
}
