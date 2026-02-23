/**
 * Community of Christ Knowledge Base
 * Enhanced conversational system with context awareness
 */

export interface KnowledgeItem {
  keywords: string[];
  response: string;
  category: "beliefs" | "practices" | "history" | "practical" | "scripture" | "personal" | "greetings";
  priority?: number; // Higher priority matches first
  followUp?: string[]; // Suggested follow-up questions
}

export const knowledgeBase: KnowledgeItem[] = [
  // GREETINGS & PERSONAL
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    response: `Hello and welcome! I'm the Minneapolis Community of Christ chatbot, here to help answer your questions about our congregation and faith.

I'm an AI assistant programmed with extensive knowledge about Community of Christ, our history, beliefs, and local congregation. While I'm not a human, I've been designed to provide accurate, helpful information about our church family.

What would you like to know about Community of Christ or our Minneapolis congregation?`,
    category: "greetings",
    priority: 10,
    followUp: ["Tell me about RLDS history", "What is the Restoration movement?", "When are worship services?", "What makes Community of Christ different?"]
  },

  {
    keywords: ["who are you", "are you real", "are you a bot", "are you human"],
    response: `I'm a chatbot - an AI assistant created to help people learn about Minneapolis Community of Christ. I'm not a real person, but I've been programmed with comprehensive information about:

• Community of Christ history and beliefs
• The RLDS/Restoration movement
• Our local congregation details
• Worship times and programs
• Church doctrine and practices

While I can't replace human connection, I can provide accurate information 24/7 to help you learn about our faith community. For personal conversations, I encourage you to call (612) 555-1234 or visit us in person!

What questions can I answer for you?`,
    category: "personal",
    priority: 9
  },

  {
    keywords: ["why community of christ", "why should i", "what makes you different", "different from"],
    response: `Great question! Let me explain what makes Community of Christ unique:

**What makes us unique:**
• We believe in **continuing revelation** - God still speaks today, not just in ancient times
• **Women and men serve equally** in priesthood - we were pioneers in this
• Our **9 Enduring Principles** guide us in practical, everyday faith
• We emphasize **peace and justice** as central to following Jesus
• We're part of a **worldwide church** (60+ nations) but maintain local autonomy

Community of Christ balances tradition with progressive theology, honoring Restoration heritage while embracing God's ongoing guidance. Prophet-President Stassi D. Cramm (the first woman in this role!) leads with wisdom and compassion.

The congregation is known for being a caring family that genuinely supports each other and the broader community.

Would you like to know more about any of these aspects?`,
    category: "personal",
    priority: 8,
    followUp: ["Tell me about the Enduring Principles", "What's your worship like?", "How can I visit?"]
  },

  // RLDS & RESTORATION HISTORY
  {
    keywords: ["rlds", "reorganized", "history", "founded", "reorganization"],
    response: `Let me explain our RLDS (Reorganized Church of Jesus Christ of Latter Day Saints) history:

**The Reorganization (1860):**
After Joseph Smith Jr.'s death in 1844, the Latter Day Saint movement split into several groups. The largest group followed Brigham Young to Utah (now LDS Church).

**Our Path:**
• In 1860, Joseph Smith III (son of Joseph Smith Jr.) became prophet-president of the "Reorganization"
• We rejected polygamy, temple rituals, and baptism for the dead
• Established headquarters in Independence, Missouri (not Utah)
• Focused on the original teachings of the Restoration

**Key Differences from Beginning:**
• Never practiced polygamy (actively opposed it)
• Democratic church governance with conferences
• Emphasis on peace and justice from early days
• Stayed in the Midwest rather than going to Utah

**Name Change (2001):**
We became "Community of Christ" to better reflect our mission and reduce confusion with the LDS Church. We're still legally incorporated as RLDS.

Our Minneapolis congregation has been part of this tradition for over 75 years!

Would you like to know more about specific aspects of our history?`,
    category: "history",
    priority: 10,
    followUp: ["What is the Restoration movement?", "How are you different from LDS?", "Tell me about Joseph Smith III"]
  },

  {
    keywords: ["restoration", "restoration movement", "latter day saint", "joseph smith"],
    response: `The Restoration movement is fascinating! Let me explain:

**The Beginning (1820s-1830s):**
• Joseph Smith Jr. claimed visions and revelations starting in 1820
• Published the Book of Mormon in 1830
• Founded the Church of Christ (later called Church of Jesus Christ of Latter Day Saints)
• Believed in "restoring" original Christianity

**Core Restoration Ideas:**
• Direct revelation from God continues today
• Priesthood authority needed restoration
• Additional scriptures alongside the Bible
• Zion - creating ideal communities on Earth
• Gathering of believers in preparation for Christ's return

**The 1844 Succession Crisis:**
After Joseph Smith Jr.'s martyrdom in Carthage, Illinois, the movement split:
• **Brighamites** → LDS Church (Utah)
• **RLDS** → Community of Christ (us!)
• **Strangites** → followed James Strang
• Several smaller groups

**Our Restoration Understanding Today:**
Community of Christ sees "restoration" not as returning to the past, but as God continually restoring relationships and communities. We focus on:
• Christ's mission of peace
• Worth of all persons
• Continuing revelation for today's world

We're part of this historical movement but have evolved significantly in our understanding and practice.`,
    category: "history",
    priority: 9,
    followUp: ["Tell me about RLDS history", "What's different from Mormons?", "Do you still believe in restoration?"]
  },

  {
    keywords: ["joseph smith iii", "joseph smith 3", "young joseph"],
    response: `Joseph Smith III was a remarkable leader! Here's his story:

**Early Life:**
• Born in 1832 to Joseph Smith Jr. and Emma Hale Smith
• Only 11 when his father was killed in 1844
• Stayed with his mother Emma in Illinois (didn't go to Utah)
• Initially reluctant to lead any church

**Becoming Prophet-President (1860):**
• At age 27, accepted call to lead the Reorganization
• Led for 54 years until death in 1914
• Longest-serving prophet-president in our history

**His Leadership Style:**
• Emphasized education and reason alongside revelation
• Strongly opposed polygamy (which hurt his father's legacy)
• Promoted democratic church governance
• Focused on moral reform and social justice
• Established Graceland University

**Key Contributions:**
• Stabilized and grew the RLDS church
• Established headquarters in Independence, Missouri
• Defended his mother Emma's reputation
• Created a more moderate, mainstream Christian approach

Joseph III helped transform the church from a scattered remnant into a stable, respected denomination. His vision of inclusive, peaceful Christianity continues to influence Community of Christ today.`,
    category: "history",
    priority: 8,
    followUp: ["What happened after Joseph III?", "Tell me about Emma Smith", "How did RLDS develop?"]
  },

  {
    keywords: ["emma smith", "emma hale"],
    response: `Emma Hale Smith is a heroic figure in our history!

**Her Life:**
• Married Joseph Smith Jr. in 1827
• First Relief Society president
• Compiled first LDS hymnal
• Mother of 11 children (5 survived to adulthood)
• Stayed in Illinois after Joseph's death (didn't go to Utah)

**Why She Matters to Community of Christ:**
• Opposed polygamy throughout her life
• Supported her son Joseph III in the Reorganization
• Kept important documents and artifacts
• Symbol of strength and faithfulness

**Her Legacy:**
• The "Elect Lady" revelation (Doctrine & Covenants)
• Advocate for women's roles in church
• Emphasis on education and culture
• Model of resilient faith through tragedy

Emma faced incredible hardships but maintained her faith and integrity. She's especially honored in Community of Christ for her courage in opposing practices she believed were wrong and supporting the Reorganization.`,
    category: "history",
    priority: 7,
    followUp: ["Tell me about women in Community of Christ", "What about polygamy?", "RLDS history"]
  },

  {
    keywords: ["lds", "mormon", "mormons", "difference", "utah"],
    response: `Great question! Here are the key differences between Community of Christ and the LDS (Mormon) Church:

**Historical Split (1844):**
After Joseph Smith Jr.'s death, we took different paths:
• LDS followed Brigham Young to Utah
• RLDS reorganized under Joseph Smith III in the Midwest

**Major Theological Differences:**

**Priesthood & Leadership:**
• We ordain women (since 1985)
• Democratic decision-making at World Conference
• Prophet presents revelations for common consent

**Practices We DON'T Have:**
• No temple ceremonies or temple garments
• No baptism for the dead
• No celestial marriage or sealing
• Never practiced polygamy
• No Word of Wisdom as commandment
• No required tithing for temple/salvation

**Scripture Interpretation:**
• We don't read scripture literally
• Book of Mormon is spiritual witness, not historical record
• Open canon - God still speaks new truths

**Focus:**
• Peace and justice central to mission
• Inclusive of LGBTQ+ members (congregational discretion)
• Non-creedal - room for diverse beliefs
• Ecumenical - work with other Christians

Both churches share Restoration heritage but have evolved in very different directions!`,
    category: "history",
    priority: 10,
    followUp: ["Do you use the Book of Mormon?", "What about temples?", "Tell me about your beliefs"]
  },

  // BELIEFS
  {
    keywords: ["believe", "belief", "beliefs", "faith", "theology", "doctrine"],
    response: `Let me share what Community of Christ believes! At the heart of everything is **Jesus Christ** - we see Him as God's love made visible.

**Core beliefs that shape our daily lives:**
• **Worth of All Persons** - Every single person is sacred. No exceptions.
• **Grace is for everyone** - God's love isn't something we earn; it's freely given
• **Continuing Revelation** - God didn't stop speaking 2000 years ago
• **Peace and Justice** - Following Jesus means actively working for shalom
• **Community matters** - We need each other to grow spiritually

We use three books of scripture: the Bible, Book of Mormon, and Doctrine & Covenants. But we interpret them through the lens of Jesus' life and teachings, not literally.

What I personally love is how these beliefs translate into action - we don't just talk about love and justice, we live it through service, advocacy, and genuine community.

What aspect of faith matters most to you?`,
    category: "beliefs",
    followUp: ["Tell me about the Book of Mormon", "What are the Enduring Principles?", "How do you practice these beliefs?"]
  },

  {
    keywords: ["enduring principles", "principles", "values"],
    response: `Oh, the Enduring Principles! These are really the heart of how we try to live our faith. Let me share them as I've experienced them:

1. **Grace and Generosity** - God's grace changed my life. We try to extend that same unconditional love to others.

2. **Sacredness of Creation** - Everything God made is holy. We're called to be caretakers, not just consumers.

3. **Continuing Revelation** - This one's exciting! God still speaks through our Prophet-President Stassi D. Cramm, through community, and yes, even to you personally.

4. **Worth of All Persons** - This isn't just words. We truly believe EVERY person has sacred worth. No exceptions based on race, orientation, status - everyone.

5. **All Are Called** - You have gifts the world needs! Everyone has a ministry, not just ordained folks.

6. **Responsible Choices** - We believe in free will guided by love and wisdom.

7. **Pursuit of Peace** - Not just absence of conflict, but active shalom - wholeness for all.

8. **Unity in Diversity** - We don't all think alike, and that's beautiful! Unity doesn't mean uniformity.

9. **Blessings of Community** - We become our best selves together, not alone.

These aren't just ideals - they shape how we worship, serve, and live daily. Which one resonates with you?`,
    category: "beliefs",
    priority: 7,
    followUp: ["How do you practice these?", "Tell me about your community", "What about LGBTQ+ inclusion?"]
  },

  // WORSHIP & PRACTICES
  {
    keywords: ["service", "worship", "time", "times", "sunday", "when"],
    response: `Here's when Minneapolis Community of Christ gathers for worship:

**Sunday Worship at 10:30 AM**
This is our main gathering - about an hour of music, prayer, sermon, and fellowship. We're pretty relaxed - come as you are! Some folks dress up, others wear jeans. What matters is that you're here.

**Friday Bible Study at 7:00 PM**
This is more intimate - we dig deep into scripture, ask hard questions, and learn together. Great coffee and usually someone brings snacks!

**Thursday Prayer Group at 6:30 PM**
A smaller group that prays for our community and world. Very supportive and healing.

First Sunday of each month we celebrate communion - all are welcome at Christ's table, no membership required!

We're at 123 Main Street, Minneapolis. There's parking in back, and we're fully accessible.

Can I help you plan a visit? I'd be happy to save you a seat or meet you at the door!`,
    category: "practical",
    priority: 9,
    followUp: ["What should I expect?", "Tell me about communion", "Do you have programs for kids?"]
  },

  {
    keywords: ["what to expect", "first time", "nervous", "visiting", "new"],
    response: `I totally understand - visiting a new church can feel overwhelming! Let me walk you through what to expect so you'll feel comfortable:

**When you arrive:**
• Greeters will welcome you (we're friendly but not pushy!)
• Grab coffee/tea in the fellowship area
• Bulletins have everything you need to follow along
• Sit anywhere you like (middle-left has the best acoustics 😊)

**During service:**
• We stand for some songs, sit for others - do what feels comfortable
• Kids are welcome to stay or go to children's church after opening
• Offering plate passes, but no pressure - visitors are our guests!
• Sermons are about 15-20 minutes, thoughtful but practical

**After service:**
• Stay for coffee and cookies if you'd like
• People might introduce themselves - we're genuinely interested, not trying to "recruit"
• No one will put you on the spot or make you fill out forms

**What we WON'T do:**
• Single you out as a visitor
• Pressure you to join
• Judge what you're wearing
• Make you say/do anything uncomfortable

I still remember my first Sunday here - I was nervous too! But everyone was so warm and genuine. Would you like me to have someone watch for you?`,
    category: "practical",
    priority: 8,
    followUp: ["Where do I park?", "What about my kids?", "When's the best time to visit?"]
  },

  // MORE CHURCH HISTORY
  {
    keywords: ["graceland", "university", "college"],
    response: `Graceland University is Community of Christ's university!

**History:**
• Founded in 1895 in Lamoni, Iowa
• Established by RLDS church for higher education
• Named after "Graceland" - a place of learning and grace

**Today:**
• Main campus in Lamoni, Iowa
• Second campus in Independence, Missouri
• About 2,000 students
• Open to all faiths (not just Community of Christ)

**Academic Programs:**
• Liberal arts and sciences
• Nursing and health sciences
• Education programs
• Business programs
• Seminary for Community of Christ ministers

**Church Connection:**
• Many church leaders educated there
• Maintains Community of Christ values
• But academically independent
• Diverse student body

Graceland represents our long commitment to education and intellectual growth alongside spiritual development!`,
    category: "history",
    priority: 6,
    followUp: ["Tell me about education in Community of Christ", "What's your seminary like?"]
  },

  {
    keywords: ["independence", "missouri", "headquarters", "auditorium"],
    response: `Independence, Missouri is incredibly significant to Community of Christ!

**Why Independence Matters:**
• Joseph Smith Jr. identified it as "Center Place" of Zion (1831)
• RLDS/Community of Christ world headquarters since 1920s
• Site of our Temple (dedicated 1994)
• Location of the Auditorium (seats 5,800!)

**Key Buildings:**

**The Temple (1994):**
• Spiral seawater shell design
• Daily prayer for peace at 12:30 PM
• Open to all people
• Focus on peace, reconciliation, healing

**The Auditorium (1926):**
• Hosts World Conference every 3 years
• Contains our archives and museum
• Historic organ with 6,334 pipes!

**Independence Today:**
• About 1,000 Community of Christ members locally
• Multiple congregations
• Historic sites from early Restoration
• Shared heritage with LDS (they have visitor center there too)

Independence represents both our history and our future - honoring the past while building peace for tomorrow!`,
    category: "history",
    priority: 8,
    followUp: ["Tell me about the Temple", "What is World Conference?", "What is Zion?"]
  },

  {
    keywords: ["world conference", "conference", "voting"],
    response: `World Conference is how Community of Christ makes decisions together!

**What It Is:**
• International gathering every 3 years in Independence
• Delegates from around the world
• Democratic decision-making body
• Like a spiritual family reunion!

**How It Works:**
• Each congregation sends delegates
• Prophet-President presents revelations for consideration
• Legislation on church policies discussed
• Common consent voting (not top-down decrees)

**Important Decisions Made:**
• 1984 - Ordination of women approved
• 2001 - Name change to Community of Christ
• 2007 - Revelation on unity and diversity
• 2013 - Guidance on human sexuality and priesthood
• Various social justice initiatives

**Recent Conferences:**
• Now includes virtual participation (post-COVID)
• Youth have voice through Young Adult representatives
• Emphasis on worldwide church, not just USA

This is what makes us different - the whole church discerns God's will together, not just leaders deciding!`,
    category: "history",
    priority: 7,
    followUp: ["How do revelations work?", "Can anyone attend?", "What about voting?"]
  },

  {
    keywords: ["zion", "kingdom", "ideal"],
    response: `"Zion" is a central concept in Community of Christ - but probably not what you'd expect!

**Historical Understanding:**
• Early Restoration: Physical gathering places (Independence, Missouri)
• Literal cities where believers would gather
• Preparation for Christ's return

**Our Understanding Today:**
Zion is wherever we create communities of:
• **Justice** - Fair treatment for all
• **Peace** - Shalom, wholeness for everyone
• **Joy** - Celebration of life and community
• **Love** - God's love expressed through us

**Not a Place, but a Cause:**
• Not waiting for heaven - building God's kingdom now
• Not exclusive to church members
• Anywhere people work for justice and peace
• Partners with others doing this work

**Practical Zion:**
• Local food banks
• Racial justice work
• Environmental protection
• Refugee support
• Fair economic systems

**Our Mission Statement:**
"We proclaim Jesus Christ and promote communities of joy, hope, love, and peace."

That's Zion - making the world more like God intends it to be!`,
    category: "beliefs",
    priority: 7,
    followUp: ["How do you build Zion?", "What about the Second Coming?", "Tell me about your mission work"]
  },

  {
    keywords: ["women", "ordination", "priesthood women", "female ministers"],
    response: `Women in priesthood is a proud part of Community of Christ's story!

**The Journey:**
• 1984 - World Conference approved women's ordination (after years of prayer and discussion)
• 1985 - First women ordained
• Now about 40% of active priesthood are women

**Historic Significance:**
• Among first Christian denominations to ordain women to ALL offices
• Women serve as apostles, bishops, evangelists, all priesthood roles
• Stassi D. Cramm - first woman Prophet-President (2023)!

**The Process:**
• Revelation presented by Prophet-President Wallace B. Smith (1984)
• Intense church-wide discussion and prayer
• Some members left, but church moved forward in faith
• Now seen as essential to "Worth of All Persons"

**Impact:**
• Transformed church culture
• Brought new perspectives to ministry
• Strengthened families seeing all as called
• Witness to wider Christianity

This wasn't just about equality - it was about recognizing God calls ALL people according to their gifts!`,
    category: "history",
    priority: 9,
    followUp: ["Tell me about Stassi D. Cramm", "What is priesthood?", "How are women leaders?"]
  },

  {
    keywords: ["kirtland", "kirtland temple", "ohio"],
    response: `The Kirtland Temple is a treasure of Restoration history that Community of Christ owns!

**Historical Significance:**
• Built 1833-1836 in Kirtland, Ohio
• First temple of the Restoration movement
• Site of important early revelations and experiences
• Dedicated March 27, 1836

**How We Got It:**
• RLDS/Community of Christ gained ownership in 1880s
• Maintained as historic site and house of worship
• Major restoration completed in recent years
• Now a National Historic Landmark

**Different from LDS Temples:**
• Open to the public for tours
• No secret ceremonies or rituals
• Used for worship services and special events
• Educational center about Restoration history

**Visiting Today:**
• Tours available year-round
• Beautiful architecture and craftsmanship
• Historic artifacts and exhibits
• Spiritual experiences for many visitors

The Kirtland Temple represents our commitment to preserving Restoration history while making it accessible to all people!`,
    category: "history",
    priority: 7,
    followUp: ["What's different about your temples?", "Can I visit?", "Tell me about church history"]
  },

  {
    keywords: ["doctrine and covenants", "d&c", "revelations"],
    response: `The Doctrine and Covenants is our book of modern revelations!

**What It Is:**
• Collection of revelations, mostly through Joseph Smith Jr.
• Also includes revelations from subsequent prophet-presidents
• Guidance for church organization and practice
• Our version differs from LDS D&C

**Key Differences from LDS Version:**
• We continue adding new revelations (latest in 2010s)
• Different numbering after Section 113
• No sections on plural marriage or baptism for dead
• Includes revelations from RLDS prophet-presidents

**Important Sections for Us:**
• Section 163 - Temple purpose (1984)
• Section 164 - Ordination of women (1984)
• Section 165 - Unity in diversity (2010)
• Various sections on peace and justice

**How We Use It:**
• Not read as infallible law
• Interpreted through lens of continuing revelation
• Historical context considered important
• Guide, not rulebook

This living document shows how God continues to speak to the church today!`,
    category: "scripture",
    priority: 6,
    followUp: ["How do revelations work?", "Tell me about continuing revelation", "What's in your scriptures?"]
  },

  {
    keywords: ["polygamy", "plural marriage", "wives"],
    response: `Let me be absolutely clear: **Community of Christ has NEVER practiced polygamy.**

**Historical Facts:**
• Joseph Smith Jr. did practice polygamy (though controversial)
• After his death in 1844, the church split
• Brigham Young's group (LDS) continued and expanded polygamy
• The Reorganization (RLDS/Community of Christ) rejected it completely

**Our Position:**
• Joseph Smith III spent his life opposing polygamy
• Emma Smith (Joseph Jr.'s widow) always denied and opposed it
• RLDS was founded partly to "clean up" the restoration
• We believe polygamy was never God's will

**Why This Matters:**
• Shows our commitment to marriage equality
• Demonstrates how we've always differed from LDS
• Part of our broader commitment to worth of all persons
• Example of rejecting harmful practices

**Today:**
• LDS officially stopped polygamy in 1890 (though some fundamentalist groups continue)
• Community of Christ supports monogamous, loving relationships
• We perform same-sex marriages in many congregations

This is one of the clearest examples of how RLDS/Community of Christ took a different path from the beginning.`,
    category: "history",
    priority: 10,
    followUp: ["Tell me about Emma Smith", "How else are you different from LDS?", "What about marriage today?"]
  },

  // SCRIPTURE & THEOLOGY
  {
    keywords: ["book of mormon", "scripture", "bible", "joseph smith"],
    response: `Yes, Community of Christ uses the Book of Mormon along with the Bible and Doctrine & Covenants. Let me explain our approach:

We see the Book of Mormon as **another witness of Jesus Christ** - it's a spiritual record of ancient peoples in the Americas. But here's what might surprise you: we don't read it the same way as our LDS cousins.

**How we're different:**
• We don't believe in biblical literalism or inerrancy for ANY scripture
• Joseph Smith Jr. was a prophet, but a human one - flawed like all of us
• We interpret scripture through Jesus' teachings, reason, and experience
• Scripture is meant to point us to God, not become an idol itself

The Book of Mormon contains beautiful teachings about justice, compassion, and God's love. My favorite part is when Jesus visits the Americas and emphasizes caring for the poor and seeking peace.

We reorganized under Joseph Smith III in 1860 (hence "RLDS" historically) and took a different path focusing on peace, inclusion, and continuing revelation.

Does this help clarify? Happy to discuss any specific questions!`,
    category: "scripture",
    followUp: ["What's the difference with LDS?", "Do you believe everything in it?", "Tell me about continuing revelation"]
  },

  // LEADERSHIP & HISTORY
  {
    keywords: ["prophet", "president", "stassi", "cramm", "leader", "woman prophet"],
    response: `Yes! Let me tell you about Prophet-President Stassi D. Cramm - she's remarkable!

**Historic moment:** Stassi became our Prophet-President in 2023, the **first woman** to hold this role in Community of Christ. This is huge! We've ordained women since 1985, but this represents a beautiful culmination of our journey toward full equality.

**About President Cramm:**
• Extensive background in church leadership and administration
• Deep commitment to peace, justice, and reconciliation
• Brings both spiritual depth and practical wisdom
• Known for her collaborative, listening leadership style

**What this means:**
Having a woman Prophet-President sends a powerful message about the worth of all persons. My daughters can now see themselves in our highest leadership. It's not just symbolic - Stassi brings fresh perspectives on revelation and mission.

**How it works:**
The Prophet-President provides spiritual leadership and presents inspired counsel (revelations) to our World Conference. The whole church then discerns and votes - it's both prophetic AND democratic!

It's exciting times in Community of Christ! Her leadership emphasizes bridge-building and healing in our divided world.

Want to know more about how prophetic leadership works in our church?`,
    category: "history",
    priority: 8,
    followUp: ["How does revelation work?", "What changes has she made?", "Tell me about women in ministry"]
  },

  // COMMUNITY & INVOLVEMENT
  {
    keywords: ["get involved", "volunteer", "help", "serve", "join", "participate"],
    response: `Oh wonderful! We'd love to have you get involved! There are so many ways to participate, depending on your interests and availability:

**Worship & Spiritual Growth:**
• Join the choir (no audition needed!)
• Be a scripture reader or greeter
• Help with communion preparation
• Join a small group or Bible study

**Service & Outreach:**
• Monthly food shelf volunteering (3rd Saturday)
• Community meals team (we serve free dinners monthly)
• Homeless shelter support group
• Environmental action team (new and growing!)

**Families & Youth:**
• Sunday school teaching or helping
• Youth group mentoring
• Vacation Bible School (summer)
• Family camp counselor

**Behind the Scenes:**
• Building and grounds care
• Tech team for livestreaming
• Office volunteers
• Coffee hour hosting

**My advice?** Start by just attending for a few weeks, get a feel for our community. Then pick ONE thing that excites you. We believe everyone has gifts to share, but no pressure - come as you are able!

What kinds of things do you enjoy doing? I can suggest a great fit!`,
    category: "practical",
    followUp: ["I like working with kids", "I'm interested in social justice", "I'm not sure I'm ready to commit"]
  },

  // PRACTICAL INFORMATION
  {
    keywords: ["location", "address", "where", "directions", "find you", "parking"],
    response: `We're easy to find! Here's everything you need to know:

**Address:**
123 Main Street, Minneapolis, MN 55401
(We're the brick building with the peace dove mosaic out front)

**Parking:**
• Free lot behind the building (enter from 2nd Ave)
• Street parking on Main St (free on Sundays!)
• Handicap spots right by the main entrance

**Public Transit:**
• Bus routes 6 & 17 stop at Main & 1st (one block away)
• Green Line to Nicollet Mall, then 5-minute walk
• Bike racks available by the side entrance

**Finding us inside:**
• Main entrance has automatic doors
• Elevator to the right for sanctuary access
• Restrooms down the hall (including family/accessible)
• Fellowship hall downstairs (follow the coffee smell!)

**GPS tip:** Search "Community of Christ Minneapolis" - sometimes just the address takes you to the back entrance.

Need help with specific directions from your area? Or would you like someone to meet you when you arrive?`,
    category: "practical",
    priority: 7,
    followUp: ["What time should I arrive?", "Where should I park?", "Is it wheelchair accessible?"]
  },

  // CHILDREN & FAMILIES
  {
    keywords: ["children", "kids", "youth", "family", "nursery", "teens"],
    response: `We LOVE having kids and families here! Seriously, a little joyful noise during service reminds us that church is alive and growing.

**For Your Kids:**

**Nursery (0-3 years)**
• Staffed by trained, background-checked caregivers
• Available during worship
• Located just off the sanctuary (you can slip out easily)

**Children's Church (4-11 years)**
• Kids start in main worship then go to their own program
• Fun, age-appropriate lessons with crafts and activities
• They rejoin for communion Sundays

**Youth Group (12-18 years)**
• Sunday evenings 5-7 PM
• Mix of fun, service, and spiritual exploration
• Monthly special events (lock-ins, service projects)
• Summer camp and mission trips!

**Family-Friendly Features:**
• Busy bags with quiet activities available
• Family restroom with changing table
• Kids are welcome to take communion
• No judgment if you need to step out!

We believe kids aren't the future of the church - they're the church RIGHT NOW. Their questions, energy, and perspectives bless us all.

What ages are your kids? I can tell you more about specific programs!`,
    category: "practical",
    priority: 8,
    followUp: ["What about teenagers?", "Is nursery safe?", "Can kids take communion?"]
  },

  // LGBTQ+ & INCLUSION
  {
    keywords: ["lgbt", "lgbtq", "gay", "lesbian", "transgender", "inclusive", "welcoming", "affirming"],
    response: `This is such an important question, and I want to be both honest and hopeful with you.

**Our Minneapolis congregation** strives to be genuinely welcoming to all people, including LGBTQ+ individuals and families. We have LGBTQ+ members who are fully part of our church family - serving, leading, and blessing us with their gifts.

**The wider church picture:**
Community of Christ internationally continues to discern these questions. In 2013, our World Conference affirmed that priesthood calls should be based on giftedness, not sexual orientation. Different congregations are at different places in their journey.

**What this means here:**
• You'll be welcomed as you are
• Your relationship/family will be respected
• You can fully participate in worship and service
• We focus on our shared love of Christ, not our differences

**My personal view:**
The Worth of All Persons isn't just words to us. I've seen how our LGBTQ+ members enrich our congregation. Love is love, and God's table is big enough for everyone.

If you visit, you'll find a community trying to live out Christ's radical inclusion, even as we're all still learning and growing.

Would you like to talk with our pastor directly? They're wonderful at helping people discern if we're a good fit.`,
    category: "beliefs",
    priority: 9,
    followUp: ["Can I get married there?", "What about other congregations?", "Are you affirming?"]
  },

  // COMMUNION & BAPTISM
  {
    keywords: ["communion", "sacrament", "lord's supper", "eucharist"],
    response: `Communion is one of my favorite parts of worship! Let me share how we practice it:

**When:** First Sunday of each month (and special occasions like Easter)

**Who can participate:** EVERYONE who wants to remember Jesus!
• No membership required
• Children are welcome
• Any baptized Christian from any denomination
• Those exploring faith are invited too

**How we do it:**
• We use bread and grape juice (not wine)
• Served by our priesthood members who bring it to you in the pews
• Brief prayers of blessing
• Time for quiet reflection with soft music

**What it means to us:**
It's not about being "worthy" - none of us are! It's about remembering Christ's love, experiencing community, and renewing our commitment to follow Jesus. I've taken communion feeling broken and left feeling whole.

**Beautiful tradition:** We often share testimonies during communion - people briefly share how God is working in their lives. It's voluntary and very moving.

Don't worry if you're not sure what to do - just follow others' lead, and know you're welcome at Christ's table!`,
    category: "practices",
    followUp: ["What about baptism?", "Can my kids participate?", "What if I'm not baptized?"]
  },

  {
    keywords: ["baptism", "baptize", "baptized", "rebaptism"],
    response: `Baptism is a beautiful step in one's faith journey! Let me share how we approach it:

**Our practice:**
• Baptism by immersion for those **8 years or older**
• It's a personal choice - no pressure, ever
• We baptize in Jesus' name for remission of sins and spiritual renewal

**What it means:**
Think of it as an outward sign of an inward commitment. It's about dying to old ways and rising to new life in Christ. But it's not a "requirement" for God's love - that's already yours!

**If you're already baptized:**
We recognize baptisms from other Christian traditions! No need to be rebaptized unless YOU feel called to it for spiritual renewal.

**The process here:**
1. Meet with our pastor to explore what baptism means to you
2. Preparation classes (usually 2-3 sessions, very conversational)
3. Choose your baptism Sunday
4. Invite family/friends to celebrate with you!
5. We have baptismal clothes if needed

**Personal note:** I was baptized at 14, and my daughter chose baptism at 10. Watching people come up from the water with joy on their faces never gets old!

Are you considering baptism, or just curious about our practices?`,
    category: "practices",
    followUp: ["I was baptized as a baby", "How old do you have to be?", "What if I'm not ready?"]
  },

  // SOCIAL JUSTICE & MISSION
  {
    keywords: ["peace", "justice", "social", "mission", "serve", "outreach", "help community"],
    response: `This is where our faith really comes alive! We believe following Jesus means actively working for peace and justice. Here's how we live that out:

**Local mission (what we're doing NOW):**
• **Food shelf** - We volunteer monthly and donate regularly
• **Homeless support** - Provide meals at shelters, winter clothing drives
• **Community meals** - Free dinner 3rd Thursday (everyone welcome!)
• **Environmental action** - Community garden, recycling programs
• **Refugee resettlement** - Partnering with local organizations

**Peace & justice advocacy:**
• We speak out against violence and war
• Support racial justice initiatives
• Advocate for economic equality
• LGBTQ+ rights and dignity
• Creation care and climate action

**Global connection:**
• Support Community of Christ's worldwide mission
• Abolish Poverty, End Suffering initiative
• Partner congregations in Haiti and Africa
• Disaster relief through church channels

**Personal story:** Last month, our youth group served 200 meals at the shelter. Seeing teenagers discover they can make a real difference - that's church to me!

We believe in "Zion" - communities of justice, peace, and joy. Not someday in heaven, but here and now.

What justice issues are you passionate about? We might be working on it!`,
    category: "beliefs",
    priority: 7,
    followUp: ["How can I help?", "Do you do mission trips?", "What about political action?"]
  },

  // MINNEAPOLIS SPECIFIC & PERSONAL
  {
    keywords: ["minneapolis", "local", "twin cities", "minnesota", "your church", "this congregation"],
    response: `Our Minneapolis congregation is something special! We've been part of this community for over 75 years, and we've got such a rich mix of people.

**What makes us unique:**
• About 120 members, but feels like family
• Incredibly diverse - age, race, economic background, life experiences
• Progressive theology in Midwest practicality
• Strong connections to local community organizations
• Beautiful historic building with modern accessibility

**Our people:**
• Longtime members whose grandparents founded the church
• Young families choosing progressive Christianity
• Former Catholics, Lutherans, evangelicals finding a new home
• Seekers and questioners welcomed with open arms
• Several same-sex couples and LGBTQ+ individuals

**Local flavor:**
• We embrace Minnesota Nice but with genuine warmth
• Potlucks that rival the State Fair (seriously!)
• Active in Twin Cities interfaith initiatives
• Partner with other peace churches in the area

**Current excitement:**
We're growing! New families joining, youth group expanding, and deepening our community engagement. There's real energy here.

Come experience our "Minnesota holy hospitality" - where everyone gets fed (body and soul) and no one leaves without a hug (if you're a hugger)!`,
    category: "personal",
    priority: 8,
    followUp: ["How big is the congregation?", "What's the community like?", "Tell me about the pastor"]
  },

  // DOUBTS & QUESTIONS
  {
    keywords: ["doubt", "question", "not sure", "struggling", "faith crisis", "don't know if i believe"],
    response: `Friend, thank you for your honesty. Doubt isn't the opposite of faith - it's often faith seeking deeper understanding.

**You're in good company here.** Many of us have wrestled with big questions:
• Is God real?
• Why do bad things happen?
• Is the Bible true?
• What happens after death?
• Does prayer work?

**What we offer:**
• Safe space to ask ANY question
• No judgment for doubts or different beliefs
• Faith that embraces mystery, not certainty
• Community that supports you wherever you are in your journey

**Personal confession:** I've had my own dark nights of the soul. Times when I wasn't sure about any of it. This community held space for me to doubt, rage, question, and slowly find my way back to a faith that's now deeper and more authentic.

**Our approach:**
We believe God is big enough for our questions. Jesus himself cried "Why?" on the cross. Your doubts don't disqualify you - they might be leading you to a more mature faith.

You don't have to have it all figured out to belong here. Come as you are - doubts, questions, and all. Sometimes just being in community helps.

What specific questions are weighing on you? No judgment - just conversation.`,
    category: "personal",
    priority: 9,
    followUp: ["I'm not sure God exists", "I've been hurt by church", "Can I come if I'm questioning?"]
  },

  // PRACTICAL NEWCOMER CONCERNS
  {
    keywords: ["money", "tithe", "offering", "give", "donate", "cost", "pay"],
    response: `Let me be really clear: **You never have to give money to be welcome here!** Seriously.

**Our philosophy:**
• Church should never be a financial burden
• Give only if you're able and feel moved to
• Your presence is more valuable than your money
• God's love isn't for sale

**How we handle offerings:**
• Plates pass during service but ZERO pressure
• Visitors are our guests - please don't feel obligated!
• Many give online or monthly - not visible during service
• We never track who gives what

**Where money goes:**
• Keeping lights on and building maintained
• Supporting our pastor and small staff
• Local mission work (food shelf, shelter meals)
• Global church mission initiatives

**Other ways to contribute:**
Time, talents, volunteer work, bringing food to potlucks, helping with building upkeep - all valuable gifts!

**Personal note:** When I first came here, I was between jobs and couldn't give anything. Never felt judged. Now that I'm able, I give joyfully, but it took years.

Bottom line: Come for spiritual nourishment. If this becomes your church home and you're able to support it, great. If not, you're still fully welcome!`,
    category: "practical",
    priority: 8,
    followUp: ["How else can I help?", "What if I can't afford to give?", "Where does the money go?"]
  },

  // HURT & HEALING
  {
    keywords: ["hurt by church", "church hurt", "bad experience", "religious trauma", "left church", "angry at church"],
    response: `I hear you, and I'm so sorry you've been hurt. Church should be a place of healing, not harm, and when it fails at that... the wounds go deep.

**You're not alone.** Many of us here are recovering from church hurt:
• Judgment and condemnation
• Spiritual manipulation
• Exclusion for being "different"
• Rigid theology that crushed rather than freed
• Leaders who failed us

**What we try to do differently:**
• Questions are welcomed, not punished
• Doubt is seen as part of faith, not failure
• Leadership is collaborative, not authoritarian
• Everyone has access to God - no gatekeepers
• Mistakes are met with grace, not shame

**My story:** I left church for 10 years after a traumatic experience with fundamentalism. When I finally tried Community of Christ, I sat in the back row and cried through the first service - not from sadness, but relief. It was church without the fear.

**Go slow.** You don't have to trust us immediately. Come when you're ready. Leave if you need to. Ask hard questions. Set boundaries. Your healing matters more than our comfort.

Would it help to talk with our pastor first, privately? They're trained in trauma-informed ministry and really get it.

You deserve a faith community that honors your journey. Whether that's us or somewhere else, I hope you find healing.`,
    category: "personal",
    priority: 10,
    followUp: ["I'm scared to try church again", "What if I get triggered?", "Can I talk to someone first?"]
  },

  // WORLD CHURCH CONNECTION
  {
    keywords: ["world church", "international", "global", "other countries", "missions"],
    response: `One of the things I love most about Community of Christ is that we're truly global! Let me paint you a picture:

**We're in over 60 nations!**
When we take communion here in Minneapolis, Christians in Congo, Australia, Haiti, and Korea are sharing the same sacred meal. How beautiful is that?

**Living diversity:**
• In Africa, drums and dancing in worship
• In Haiti, services under mango trees
• In Asia, incorporating local cultural expressions
• In Europe, ancient and modern traditions blend

**Our connection:**
• World Conference every three years (like a family reunion!)
• Mission trips and partnerships
• Supporting congregations in developing nations
• Youth exchange programs
• Global justice initiatives

**Prophet-President Stassi D. Cramm** leads this worldwide church with such wisdom, honoring both unity and cultural diversity.

**Personal experience:** I went on a mission trip to Honduras. Seeing how Community of Christ there cares for orphans and provides clean water - it changed my understanding of what church can be. We're literally changing lives!

**Local impact:** We support a sister congregation in Haiti. Their youth choir recorded a blessing song for us - there wasn't a dry eye in the sanctuary!

Want to know more about specific world church initiatives?`,
    category: "history",
    followUp: ["Tell me about mission work", "How can I help globally?", "Do you do mission trips?"]
  },

  // SEASONAL & SPECIAL
  {
    keywords: ["christmas", "easter", "holiday", "special services", "holy week"],
    response: `Oh, you're asking about my favorite times of year! Holidays at Community of Christ are meaningful and joyful:

**Christmas Season:**
• Advent candle lighting with families
• Christmas Eve candlelight service (magical!)
• Children's pageant (adorably chaotic)
• Cookie exchange and caroling parties
• Giving tree for local families in need

**Easter/Holy Week:**
• Palm Sunday with actual palms!
• Maundy Thursday communion (very moving)
• Good Friday contemplative service
• Easter sunrise service in the park
• Easter egg hunt for kids
• Flowering cross tradition

**Other special times:**
• World Communion Sunday (October) - connecting globally
• Peace Sunday (September) - special emphasis on peacemaking
• All Saints Day - remembering loved ones
• Thanksgiving interfaith service

**What makes these special:**
We balance tradition with inclusivity. Not everyone celebrates the same way, and that's honored. Focus is on community, service, and spiritual meaning rather than obligation.

**Pro tip:** Christmas Eve and Easter are perfect times to visit - everyone expects new faces, extra welcoming, and you get to see us at our festive best!

Planning to join us for a holiday service?`,
    category: "practical",
    followUp: ["When is Christmas service?", "What should I expect at Easter?", "Are holidays very formal?"]
  },

  // CLOSING RESPONSES
  {
    keywords: ["thank", "thanks", "appreciate", "helpful"],
    response: `You're so welcome! It's been a joy chatting with you.

Remember, these are just words on a screen - the real magic happens when you experience our community in person. We'd love to meet you!

If you need anything else:
📞 Call us: (612) 555-1234
✉️ Email: info@minneapoliscofchrist.org
🌐 Or just show up Sunday at 10:30 AM!

May you find the spiritual home you're seeking, wherever that may be. You're always welcome here.

Blessings and peace to you! 🕊️`,
    category: "greetings",
    followUp: ["How do I visit?", "Can I talk to a real person?", "See you Sunday!"]
  },

  {
    keywords: ["goodbye", "bye", "see you", "take care", "later"],
    response: `It's been wonderful talking with you! I hope I've been helpful.

Remember - our doors (and hearts) are always open. Whether you visit tomorrow or months from now, you'll be welcomed with open arms.

Until we meet again, may you walk in peace and feel God's love surrounding you.

See you soon, friend! 👋`,
    category: "greetings"
  },

  // DEFAULT FALLBACKS
  {
    keywords: ["confused", "don't understand", "what", "huh"],
    response: `I apologize if I wasn't clear! Let me try again or approach your question differently.

Could you tell me more about what you'd like to know? For example:
• Questions about our beliefs or practices
• Service times and location
• How to get involved
• What makes us unique
• Children and youth programs
• Our approach to scripture

Or feel free to call us directly at (612) 555-1234 - sometimes a real conversation is better than texting!

What specific aspect would you like to explore?`,
    category: "greetings"
  }
];

// Enhanced matching algorithm with context awareness
export function findBestMatch(query: string, conversationHistory?: string[]): {
  response: string;
  followUp?: string[];
  confidence: number;
} {
  const normalizedQuery = query.toLowerCase();

  // Score each knowledge item
  let bestMatch = {
    item: null as KnowledgeItem | null,
    score: 0,
    keywordMatches: [] as string[]
  };

  for (const item of knowledgeBase) {
    let score = 0;
    const matchedKeywords: string[] = [];

    // Check keyword matches
    for (const keyword of item.keywords) {
      if (normalizedQuery.includes(keyword)) {
        score += keyword.split(' ').length * 10; // Multi-word matches score higher
        matchedKeywords.push(keyword);

        // Exact match bonus
        if (normalizedQuery === keyword) {
          score += 50;
        }
      }
    }

    // Priority bonus
    if (item.priority) {
      score += item.priority;
    }

    // Context bonus if this relates to conversation history
    if (conversationHistory && conversationHistory.length > 0) {
      const recentContext = conversationHistory.slice(-3).join(' ').toLowerCase();
      for (const keyword of item.keywords) {
        if (recentContext.includes(keyword)) {
          score += 5;
        }
      }
    }

    if (score > bestMatch.score) {
      bestMatch = { item, score, keywordMatches: matchedKeywords };
    }
  }

  // If we have a good match
  if (bestMatch.item && bestMatch.score > 10) {
    return {
      response: bestMatch.item.response,
      followUp: bestMatch.item.followUp,
      confidence: Math.min(bestMatch.score / 100, 1)
    };
  }

  // Default response if no match
  return {
    response: `I'd love to help you learn more about Minneapolis Community of Christ! I can share information about:

**Faith & Beliefs**
• Our Enduring Principles and core beliefs
• What makes Community of Christ unique
• Our Prophet-President Stassi D. Cramm

**Worship & Community**
• Sunday worship at 10:30 AM
• Friday Bible study at 7:00 PM
• Children and youth programs
• How to get involved

**Practical Information**
• Location and directions
• What to expect when visiting
• Contact information

What would you like to know more about?`,
    followUp: ["Tell me about your beliefs", "When is worship?", "I'd like to visit"],
    confidence: 0.3
  };
}