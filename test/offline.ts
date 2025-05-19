// load .env first before loading anything that needs api key, necessary env isnt loaded first
import dotenv from 'dotenv';
dotenv.config({ path: '.env.offline' });

import summarize from '../src/utils/llm/summarize';
import definePersonas from '../src/utils/llm/personas';
import generateDialogue from '../src/utils/llm/dialogue';
import { ScriptParams, SectionMetadata } from '../src/types/service';
import { Reviser } from '../src/utils/llm/revise';
import { Script } from '../src/types/inferred';

const input =
`
# Delaware DEL20 goes SuperNova
March 27, 2025

Have you heard of SuperNova? It's the premier tech and innovation festival you won't want to miss! At SuperNova 2026, with the theme "Shoot for the Moon," ambition, innovation, and excellence are celebrated. Just as the moon landing seemed impossible 50 years ago, today's tech advancements push the boundaries of what's possible. Together, we can aim higher, think bolder, and shape the future.

The delaware DEL20 community is an ecosystem that makes digital transformation tangible. It allows businesses to experiment with new technologies like AI, robotics, and IoT without worrying about competition, budgets, or failure. Clients propose projects, and delaware offers a framework and free consulting days for winners to realize their ambitions, sharing insights with the entire DEL20 community.

And that's where these two come together. DEL20 is part of the SuperNova Festival to help businesses innovate and share insights with a broader audience. SuperNova 2025 isn't just about discussing the future; it's about building it. Don't miss your chance to be part of something extraordinary!

It gets even more exciting: The 3 winners will receive 25 consultancy days to accelerate the development of their solutions and bring their innovative ideas to life! This is an incredible opportunity to push your project to the next level and turn your vision into reality.
a challenge that needs solving?

Is your company looking for solutions to a specific challenge? The DEL20 community is the perfect opportunity for you! This year, we invite you to join us at the SuperNova Festival in the vibrant city of Antwerp on March 27, 2025. This event offers a unique chance to participate in inspiring DEL20 sessions, listen to captivating keynote speakers, and network with like-minded innovation enthusiasts. 

Submit your experiment to showcase your ideas and solutions to a panel of experts and industry leaders. By submitting your experiment, you'll get valuable feedback, increase your visibility, and have the chance to form partnerships that can help move your project forward. Don't miss this chance to present your pitch and be part of this extraordinary event.
mark your calendar!

# Timeline:

## February 25: Deadline experiments
We are excited to announce the call for innovative experiments! This is your chance to showcase your creativity and ingenuity. Companies facing challenges are encouraged to participate and submit their groundbreaking ideas. All experiments must be received by February 14. We encourage participants to think outside the box and present ideas that can make a significant impact. Don't miss this opportunity to contribute to the future of innovation!


## February 28: The jury's decision

The jury consists of representatives from Bluechem, The Beacon, Port of Antwerp, Futures, and delaware. Their role is to evaluate the submitted experiments and select the most innovative ones. The jury will review all experiments and provide feedback to the participants. This process ensures that only the best and most promising experiments move forward to the final event.


## March 3 - 21: Master your pitch

Participants will receive dedicated coaching to enhance their presentation skills. This coaching helps refine pitches, improve delivery, and build confidence. Expert coaches provide personalized feedback and guidance to ensure each presentation is polished and impactful. This valuable opportunity offers insights and tips from professionals, ensuring standout presentations at the final event.

## March 27: Reverse Pitching at the SuperNova Festival

The SuperNova event will feature an exciting Reverse Pitching session, where companies present their experiments and the jury, along with the audience, will choose 3 winners. Each winner will receive 25 consultancy days to further develop their solutions. Students and startups can sign up to work on one of the 3 winning cases. Later this year, there will be an update on the winners' progress. Don’t miss this unique opportunity to collaborate on groundbreaking innovations and help shape the future!


# Why Attend?

-  Knowledge Sharing: Connect with colleagues, companies from various sectors, experts, and students with innovative ideas.
- Win 25 Free Consultancy Days: delaware offers its business expertise, technical skills, and 25 days of free consultancy for the 3 winning projects presented to the jury during the Reverse Pitching.
- Networking: You will have the chance to network and share knowledge with diverse industries facing similar challenges.

# Agenda SuperNova Festival
## Mar 27, 2025
### 8:00 AM
Start your day at SuperNova with a delightful breakfast (120 min.)
read more
### 10:00 AM
Inspiring keynote by SuperNova (60 min.)
read more
### 11:00 AM
Reverse pitching & DEL20 presentations (90 min.)
read more
### 12:30 PM
Lunch time (180 min.)
### 12:00 PM
Afternoon synergy (180 min.)
read more
### 15:00 PM
Celebrating innovation & Future Entrepreneurship Event (240 min.)
read more

# Practical Information and Tickets
Are you excited to learn and network? We would love to have you join us!

If you want to visit and enjoy the event, please send an email 
to Lisa Platteau to confirm your attendance.

We are eager to hear your ideas and collaborate on exciting new projects. Don't miss this opportunity to be part of something special! 


# 📅 Date: Thursday, March 27, 2025
📍 Location: Waagnatie - Rijnkaai 150, 2000 Antwerpen

Visit the SuperNova website here
Submit your experiment

    "Accelerate innovation by unlocking the power of cross-industry sharing, tap into the insight of the academic world, and secure funding from delaware." 
    Christoph Bogaerts, Partner at delaware 

# About DEL20

The DEL20 community is an ecosystem that makes digital transformation concrete.  

“The main idea of the DEL20 ecosystem is to allow businesses to experiment with new technologies like AI, robotics, IoT and more, without having to worry about competition, budgets, or risk of failure,” explains Thierry Bruyneel, partner at delaware and event creator. “Clients can propose a project and we offer them a framework – along with free consulting days for the winner – to help realize their ambitions. Meanwhile, the goal is to share insights and findings with the entire DEL20 community.”

At SuperNova 2025, with our theme "Shoot for the Moon," we celebrate ambition, innovation, and the relentless pursuit of excellence. Just as the moon landing 50 years ago seemed like an impossible dream, today's technological advancements are pushing the boundaries of what we believe is possible. Let's aim higher together, think bolder, explore uncharted territories, and shape the future.

SuperNova 2025 is not just about discussing the future; it's about building it. Don't miss your chance to be part of something extraordinary!

© 2025 Delaware Consulting CV - BE 0479.117.543 • Terms of Use • Privacy Statement • Responsible Disclosure • Cookie Policy
`
// thie defines an end2end test of the system
// generating a full script by basically piping the
// scripts from each section to generate the next
// until a full script is gend
async function main() {
    const params: ScriptParams = {
        episodeId: "0",
        sectionId: "0",
        title: "Delaware is going SuperNova",
        sections: [
            {
            id: "0",
            title: "Introduction",
            order: 0,
            sourceContent: input ,
            targetDuration: 35,
            },
            {
            id: "1",
            title: "The Delaware DEL20",
            order: 1,
            sourceContent: input ,
            targetDuration: 100,
            },
            {
            id: "2",
            title: "Practical Information",
            order: 2,
            sourceContent: input ,
            targetDuration: 60,
            },
            {
            id: "3",
            title: "Conclusion and Call to Action",
            order: 3,
            sourceContent: input ,
            targetDuration: 40,
            }
        ]
    }

    const summary = await summarize(input, Reviser);
    const personas = await definePersonas(input, Reviser);
    if(!summary || !personas) return;

    let script: Script|undefined = undefined;

    for (const section of params.sections) {
        const metadata: SectionMetadata = {
            episodeTitle: params.title,
            sectionTitle: section.title,
            order: section.order,
            targetDuration: section.targetDuration
        }

        const newSection = await generateDialogue(personas, summary, metadata, script);

        if(!script) {
            script = newSection;
        }
        else {
            script.lines = script.lines.concat(newSection.lines);
        }
    }

    console.log(JSON.stringify({
        summary: summary,
        personas: personas,
        script: script
    }));
}

main();
