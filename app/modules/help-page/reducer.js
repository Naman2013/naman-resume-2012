import createReducer from '../utils/createReducer';

import { SET_HELP_PAGE_ANCHOR } from './actions';

const initialState = {
  anchor: '',
  paragraphs: [
    {
      title: 'New to Slooh',
      textParagraphs: [
        'Welcome!  We know that space can seem rather daunting and boundless, so we’ve designed your adventure into the vast unknown to unfold in stages. For starters, while we may be alone in the Universe (who can really say?), you will never be alone at Slooh. Slooh is founded upon the principle that looking through telescopes is more interesting (and affordable!) as a social experience, and therefore you will find insights and support from the community every step of the way.',
        'We’ve situated large, robotic telescopes under the highest, darkest skies on Earth, so you can look up in wonder any time of day, even if it is cloudy where you live. And Slooh’s global telescope network provides coverage of space from around the world, monitored 24 hours a day by Slooh Astronomers and shared live with you.',
        'Slooh is space for everyone, which includes experiences for every level and budget. Go find yours!',
      ],
      paragraphAnchor: 'new-to-slooh',
    },
    {
      title: 'Telescopes and Reservations',
      textParagraphs: [
        'We know you want to see outer space for yourself, so here’s how Slooh makes that happen. We’ve installed several telescopes in the Canary Islands and Chile, each of which is specialized to feature certain types of celestial objects. Weather permitting, the telescopes are live all night, every night of the year. They are fully robotic, so they even work Christmas. Every 5 to 10 minutes, each telescope features a new object in the sky, what we call a “mission”, as determined by a Slooh Apprentice or Astronomer member via the reservation system. All members get to look on regardless of who is in control, so all members see all missions. And of course you can control the telescopes yourself by making your own reservations.',
        'Members can take photos during any mission. You can take photos by watching a mission live and clicking the camera icon below the telescope feed, which will result in photos from that mission being saved in “My Pics”. Making a reservation or ‘piggybacking’ on another member’s existing reservation will result in photos from that mission automatically being saved in “My Pics”, even if you are not able to watch the mission live.',
      ],
      paragraphAnchor: 'telescopes',
    },
    {
      title: 'Community',
      textParagraphs: [
        'We’ve curated a catalog of the most popular objects in the sky which we call the Slooh 500. In the spirit of community, while you are looking at any of these objects through a Slooh telescope, we will share posts about that particular object as made by members of the community. Slooh curates these posts, and true to our mission, welcomes diverse perspectives about what is \'out there\', knowing that no one interpretation can ever be definitive. Slooh is open to the spiritual, the artistic, the imaginative, along with the scientific. We will recognize and reward members of the community who make the most popular posts. All posts are freely available to the public, who are invited to participate in the community as well.',
      ],
    },
    {
      title: 'Space Situation Room',
      textParagraphs: [
        'Our team of astronomers monitor the happenings in space from the Space Situation Room at Slooh HQ, which you will find percolating with activity on a daily basis. With over 30 telescopes in the network and partners all over the world, we are able to share every interesting celestial moment with you via live video, including fully produced shows featuring Slooh Astronomers and expert guests as well as daily telescope feeds of space. We have journeyed with a mobile observatory to Kenya, the Faroe Islands, Indonesia, Iceland, Australia, and Alaska, and partnered with observatories in Arizona, Japan, Hawaii, Cypress, Dubai, South Africa, Australia, New Zealand, Norway and many more to livestream celestial events of potentially hazardous asteroids (PHAs), comets, transits, eclipses, solar activity, auroras and more.  Come celebrate the Transcontinental Eclipse, a Total Solar Eclipse on August 21st, 2017 in Stanley, Idaho, with Slooh as we host a three day cultural festival for members.',
      ],
      paragraphAnchor: 'shows',
    },
    {
      title: 'Membership Levels',
      textParagraphs: [
        '<strong>Slooh Apprentice</strong> - entry level product, designed for beginners and students, costs $4.95 per month with a 30 day free trial, providing a curated experience to point the telescopes at any of the Slooh 500, the most popular objects in the night sky. Plus 24 hour access to the Space Situation Room. <strong><a href="https://saturn.slooh.com/join.php?type=a">Buy Now</a></strong>',
        '<strong>Slooh Astronomer</strong> - appropriate for more advanced amateur astronomers, costs $24.95 per month and features the ability to point any of Slooh\'s telescopes on an unlimited basis at any object in the sky, either by choosing from existing astronomical catalogs or by entering coordinates. Plus 24 hour access to the Space Situation Room. <strong><a href="https://saturn.slooh.com/join.php?type=c">Buy Now</a></strong>',
        'Want to build your mind’s eye a bit more before looking through the telescopes? <strong><a href="https://saturn.slooh.com/join.php?type=s">Register</a></strong> as <strong>Slooh Crew</strong> to see, share and comment in the community sections of the website.'
      ],
      paragraphAnchor: 'membership',
    },
    {
      title: 'Contact Customer Service',
      textParagraphs: [
        'If you have questions about Slooh or any of our membership plans, please email us at <a href="mailto:friend@slooh.com">friend@slooh.com</a> or click <a href="#/about/contact">here</a>.',
      ],
      paragraphAnchor: 'support',
    },
    {
      title: 'Site Feedback',
      textParagraphs: [
        'We welcome your feedback as we strive to improve the user experience. Please submit your thoughts to <a href="mailto:support@slooh.com">support@slooh.com</a>',
      ],
      paragraphAnchor: 'feedback',
    },
    {
      title: 'Terms & Conditions',
      paragraphAnchor: 'terms',
      textParagraphs: [
        'The Slooh Member Agreement is a legal document that details your rights and obligations as a Slooh member.   You cannot become a Slooh Member until you have accepted the terms of the Member Agreement.  The Member Agreement provides very important information about your Slooh membership, so you should take the time to read and understand it. The Internet and online world is changing rapidly and as technology and Slooh’s business continue to evolve, these policies may have to be updated or revised.  By joining Slooh and accepting the Member Agreement you agree that Slooh may change the terms of this Member Agreement.  If you don’t agree to the changes proposed by Slooh, or to any of the terms in this Member Agreement, your only remedy is not to renew your Slooh membership.  This Agreement is your entire agreement with Slooh and governs your use of Slooh’s online services.',
        'To be a Slooh member, you must be at least 18 years old.  If you are not yet eighteen years old, you may still use Slooh, but only if the account was created and registered by your parent or guardian.  When you accept this Agreement and complete the Slooh registration process, you become the “master account”  holder.  As the master account holder, you are responsible for all activity on your account. <strong>No sharing of a Slooh  account is permitted under any circumstances.</strong> A maximum of two accounts per household is permitted.  A maximum of one promotional account per household is permitted.  You agree not to reveal your password to anyone, and you agree to indemnify and hold Slooh harmless for any improper or illegal use of your account. <strong>Your account is at risk if you allow someone else to use it.</strong> If your membership is terminated for violating this Agreement, Slooh’s prior written permission will be necessary before you are allowed to use Slooh again.',
        'Any request for your password should be treated with appropriate suspicion – Slooh will never ask you for your password.',
      ],
      paragraphs: [
        {
          title: 'Membership',
          textParagraphs: [
            'Slooh Apprentice membership includes use of the telescopes to make five reservations per month from the “Slooh 500” object list, access to all Slooh event shows and the Space Situation Room feeds, access to Community Content, and attend Slooh Road Trips.  In addition, Slooh Apprentice members are entitled to participate in as many Editor Missions as are scheduled during the term of their membership, subject to the following rules:',
            [
              'Editor Missions are defined as looking through a telescope with all other logged-in members at objects according to a pre-planned schedule.',
              'Under normal hours of operation, missions will be available from roughly 30-minutes after sunset to 30-minutes before sunrise at the observatory location.',
              'Due to poor weather or mechanical failure, the telescopes may be not always be in operation.',
              'In order to preserve the quality of the experience, Slooh may suspend missions when imaging conditions are marginal.',
            ],
            'Slooh Astronomer membership includes all the features of Apprentice membership, plus the ability to schedule any object in the night-sky (including coordinate reservations), additional member telescope time (Member Missions), which may be used at any time throughout the term of membership, subject to the following rules:',
            [
              'Member telescope time is defined as time spent in direct control of the telescope by a member, in which that member can choose from a list of celestial objects to view, or enter coordinates to point the telescope as desired.',
              'Member time must be reserved in advance, according to the schedule posted on the site.',
              '<strong>Members may make unlimited reservations</strong>, but are limited to five pending reservations at any given time.  Once an existing reserved mission has run, another reservation can be made.  This policy may be adjusted at any time based on member load.',
              '<strong>The total number of missions that may be reserved by a member during the term of their membership is unlimited.</strong>',
            ],
            'Slooh Astronomer membership also includes access to the Discussion Boards, the ability to make coordinate missions, and access to the raw FITS data.',
            'Slooh Apprentice members wishing to upgrade their membership to the Slooh Astronomer level may do so by emailing Customer Service.',
          ],
        },
        {
          title: 'Slooh Images',
          textParagraphs: [
            'Members have the ability to download images generated by Slooh.  Members agree not to use these images for any  commercial purpose, or remove the Slooh logo, without prior written approval from Slooh.  If cropping, animating, or other image processing causes the Slooh logo to be deleted or obscured, it must be replaced with a new logo,  available <strong><a href="https://polaris.slooh.com/files/Discussion_Board_Content/Slooh_Space_for_Everyone_Logos.zip">HERE</a></strong> in PNG format.  These logos must also be added to all images created using Slooh FITS data.  In all cases, the Slooh logo must be at least 100 pixels wide.  Members are permitted to publish such images or data online or in print media, provided the Slooh logo is included and clearly visible, and <strong>they are not published within 24-hours of their creation.</strong> The 24-hour publication embargo safeguards the benefits of accessing near real-time images to Slooh’s paying members.  However, members are permitted to publish images or data within the embargo period if it is to Slooh member-only groups or websites such as the Slooh Discussion Boards.',
            'If you publish images from another member’s mission you need to provide credit to them in the form of text on the image.',
            '<strong>Slooh members must not share Slooh FITS data outside of the membership under any circumstances.</strong> In order to safeguard members’ work, members may not share the FITS data from other members’ missions at all.',
            '<strong>Any submission of images or data obtained using Slooh’s service to organizations, agencies or groups (such as, but not limited to the IAU, CBAT, MPC, Yahoo groups, Facebook groups, BAA, etc.) must be coordinated through Slooh.  Prior written permission must be obtained from Slooh before such submissions are permitted (email: support@slooh.com).   This measure is intended to safeguard Slooh’s reputation relating to the accuracy and quality of submissions to 3rd party organisations.</strong>',
          ],
        },
        {
          title: 'Charges and Billing',
          textParagraphs: [
            '<strong>Memberships will be renewed automatically at the end of the subscription term, unless you cancel as described in the ‘Termination and Cancellation’ section below.</strong>',
            'You agree to authorize Slooh to make such recurring charges on or about the date of your renewal.  Slooh reserves the right to change our fees or billing methods at any time and Slooh will provide notice of any such change seven days in advance of your renewal.  If you do not agree with the changes in fees or billing methods, you may choose not to renew your membership, but Slooh will not refund any remaining portion of the previously paid subscription when you cancel your membership.  Former members who re-join Slooh will have to create a new account; images and other data from lapsed or cancelled accounts are not retrievable.',
            'As the account holder, you are responsible for all charges incurred, including applicable taxes, and all usage and purchases under your account.',
            'At some point, Slooh may offer certain premium services that incur an additional charge.  Slooh will provide notice of any additional charge before you select the premium service.  You are responsible for any charges for premium services incurred using your account.',
            'You are responsible and liable for any fees, including attorney and collection fees, that Slooh may incur in its efforts to collect any outstanding balances due from you.  You also agree that you will be billed for and will pay any outstanding balances if you cancel your membership or your account is terminated.  You must let us know about any billing problems or discrepancies within thirty days after they first appear on your account statement.  If you do not bring them to Slooh’s attention within thirty days, you agree that you waive your right to dispute such problems.',
          ],
        },
        {
          title: 'Discussion Boards/Forums/Chat',
          textParagraphs: [
            'The Slooh web site may contain, from time to time, discussion boards, galleries, chat rooms, or other message or communication facilities.  You agree to use these facilities only to send and receive messages and material that are proper and related to the particular facility.  By way of example, and not as a limitation, you agree that when using these facilities, you shall not:',
            [
              'Defame, abuse, harass, stalk, threaten, or otherwise violate the legal rights (such as rights of privacy and publicity) of others;',
              'Publish, post, distribute, or disseminate any defamatory, infringing, obscene, indecent, or unlawful material or information, or any material or information that promotes bigotry, racism or hatred;',
              'Upload files that contain software or other material protected by intellectual property laws (or by rights of privacy and publicity) unless you own or control the rights thereto or have received all necessary consents;',
              'Upload files that contain viruses, corrupted files, or any other similar software or programs that are intended to damage, detrimentally interfere with, surreptitiously intercept or expropriate any system, data or personal information, including email addresses;',
              'Delete any author attributions, legal notices, or proprietary designations or labels in any file that is uploaded;',
              'Falsify the origin or source of software or other material contained in a file that is uploaded;',
              'Advertise or offer to sell any goods or services;',
              'Conduct forward surveys, contests or chain letters;',
              'Download any file posted by another member that you know, or reasonably should know, cannot be legally distributed in such manner.',
            ],
            '<strong>Violation of this clause may result in account termination without any refund of membership fees or other reimbursement.</strong>',
            'You acknowledge that Slooh’s website is public and not for private communications.  Accordingly, you agree not to post questions, requests or comments regarding your account, billing or related details in the Discussion Boards or elsewhere on the website.  You agree to submit such questions, requests or comments only by direct email to:',
            '<strong>Account Queries:</strong> <a href="mailto:custserv@slooh.com">custserv@slooh.com</a>',
            '<strong>Technical Support:</strong> <a href="mailto:support@slooh.com">support@slooh.com</a>',
            'Further, you acknowledge that chats, postings, conferences, and other communications by other users are not endorsed by Slooh, and such communications shall not be considered reviewed, screened, or approved by Slooh.  Slooh reserves the exclusive right to establish and modify the criteria for what constitutes offensive or objectionable content.  Further, you acknowledge that it is impossible for Slooh to know whether a posting represents a copyright violation or other infringement.  The provider of any such content is responsible for ensuring that such content does not violate any extant copyright.  Slooh reserves the right for any reason to remove without notice any content posted to the Discussion Boards or Community Content.  Slooh reserves the right to deny in its sole discretion any user access to this website or any portion thereof without notice.  Once you post content on Slooh, you expressly grant Slooh the complete right to use, reproduce, modify, distribute, etc. the content in any form, anywhere.',
          ],
        },
        {
          title: 'Slooh License',
          textParagraphs: [
            'Slooh provides you with a limited license to use our website, which you agree to use in accordance with these rules.  You may not share, sub-license, rebroadcast or charge others to use or access this website or its content without first obtaining written permission from us.',
            'Training materials and all other content on Slooh’s websites or systems, including but not limited to the members’ Discussion Boards, is copyright Slooh LLC, Washington Depot, CT, and may not be copied or shared with any third party, organisation or person under any circumstances. <strong>Sharing or use of any training material or Slooh activity is not permitted outside of your Slooh membership.</strong>',
            'We will occasionally provide automatic upgrades to improve your online experience.',
            'You agree not to decompile, disassemble, or otherwise reverse-engineer this website or information contained in or on this website or any software contained therein, or to descramble a scrambled work, to decrypt an encrypted work, or otherwise to avoid, bypass, remove, deactivate, or impair technological measures meant to ensure proper authentication and authorization of legitimate users.  You agree not to access or write to the reservation system in any automated or semi-automated fashion; all member reservations must be made manually through the reservation pages.  You agree not to access the website or systems in any automated or semi-automated fashion in order to acquire images or data or otherwise use Slooh’s systems or website. <strong>Violation of this clause may result in account termination without any refund of membership fees or other reimbursement.</strong> Slooh Radio and the audio storytellers are the sole and exclusive property of Slooh LLC.  No recording or rebroadcast can be made without express written consent of Slooh LLC.',
          ],
        },
        {
          title: 'Warranty',
          textParagraphs: [
            'MEMBER EXPRESSLY AGREES THAT THE USE OF SLOOH AND THE SLOOH WEB SITE IS AT MEMBER’S SOLE RISK.  THE SLOOH SITE IS PROVIDED “AS IS” AND “AS AVAILABLE” FOR YOUR USE, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, UNLESS SUCH WARRANTIES ARE LEGALLY INCAPABLE OF EXCLUSION.  SLOOH PROVIDES THE SLOOH SERVICE ON A COMMERCIALLY REASONABLE BASIS AND DOES NOT GUARANTEE THAT MEMBERS WILL BE ABLE TO ACCESS OR USE THE SERVICE AT TIMES OR LOCATIONS OF THEIR CHOOSING, OR THAT SLOOH WILL HAVE ADEQUATE CAPACITY FOR THE SERVICE AS A WHOLE OR IN ANY SPECIFIC GEOGRAPHIC AREA.  YOUR SOLE AND EXCLUSIVE REMEDY FOR ANY OTHER DISPUTE WITH SLOOH IS THE CANCELLATION OF YOUR ACCOUNT.  IN NO CASE SHALL SLOOH BE LIABLE FOR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF SLOOH, THE INTERNET OR FOR ANY OTHER CLAIM RELATED IN ANY WAY TO YOUR MEMBERSHIP WITH SLOOH.  BECAUSE SOME STATES OR JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR THE LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, IN SUCH STATES OR JURISDICTIONS, SLOOH’S LIABILITY SHALL BE LIMITED TO THE EXTENT PERMITTED BY LAW.  SLOOH DOES NOT ENDORSE, WARRANT OR GUARANTEE ANY PRODUCT OR SERVICE OFFERED THROUGH SLOOH AND WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.',
          ],
        },
        {
          title: 'Indemnification',
          textParagraphs: [
            'Upon a request by Slooh, you agree to defend, indemnify and hold harmless Slooh and its affiliated subsidiaries, employees, contractors, officers, directors, telecommunications providers and content providers from all liabilities, claims and expenses, including attorney’s fees, that arise from a breach of this Member Agreement for which you are responsible or from the use of Slooh or the Internet, or in connection with your transmission of any Content on Slooh.  Slooh reserves the right, at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by a Member.  In that event, the member shall have no further obligation to provide indemnification for Slooh in that matter.',
          ],
        },
        {
          title: 'Termination and Cancellation',
          textParagraphs: [
            'Either you or Slooh may terminate or cancel your membership at any time.  You understand and agree that the cancellation of your account is your sole right and remedy with respect to any dispute with Slooh.  This includes, but is not limited to, any dispute related to, or arising out of:',
            [
              'any term of this Agreement or Slooh’s enforcement or application of this Agreement;',
              'any policy or practice of Slooh, or Slooh’s enforcement or application of these policies;',
              'the content available through Slooh or the Internet or any change in content provided through Slooh;',
              'your ability to access and/or use Slooh; or',
              'the amount or type of fees, surcharges, applicable taxes, billing methods, or any change to the fees, applicable taxes, surcharges or billing methods.',
            ],
            'If your membership is paid through PayPal, you must visit their site to cancel.  Otherwise, you can cancel your membership by using the facility on your My Account page.   If you cancel near the end of your billing period and are inadvertently charged for the next year’s fee please contact Slooh by email to have the charges reversed.  Slooh reserves the right to collect fees, surcharges or costs incurred before you cancel your Slooh membership.  In addition, you are responsible for any charges incurred to third-party vendors or content providers prior to your cancellation.',
            'In the event that your account is terminated or cancelled, no refund, including any membership fees, will be granted; no telescope time or other credits will be credited to you or can be converted to cash or other form of reimbursement.  Active Slooh Members may not allow former Members or other agents whose memberships have been terminated to use their accounts.',
          ],
        },
        {
          title: 'Law and Legal Notices',
          textParagraphs: [
            'The Member Agreement represents your entire agreement with Slooh.  You agree that this Member Agreement is not intended to confer and does not confer any rights or remedies upon any person other than the parties to this Agreement.  If any part of this Agreement is held invalid or unenforceable, that portion shall be construed in a manner consistent with applicable law to reflect, as nearly as possible, the original intentions of the parties, and the remaining portions shall remain in full force and effect.  The laws of New York, excluding its conflicts-of-law rules, govern this Agreement and your membership.  As noted above, member conduct may be subject to other local, state, national, and international laws.  You expressly agree that exclusive jurisdiction for any claim or dispute with Slooh or relating in any way to your membership or your use of Slooh resides in the courts of New York and you further agree and expressly consent to the exercise of personal jurisdiction in the courts of New York in connection with any such dispute including any claim involving Slooh or its affiliates, subsidiaries, employees, contractors, officers, directors, telecommunication providers and content providers.',
            'You agree to abide by U.S. and other applicable export control laws and not to transfer, by electronic transmission or otherwise, any content or software subject to restrictions under such laws to a national destination prohibited under such laws, without first obtaining, and then complying with, any requisite government authorization.  You further agree not to upload to Slooh any data or software that cannot be exported without prior written government authorization, including, but not limited to, certain types of encryption software.  This assurance and commitment shall survive termination of this agreement.',
            'The section headings and subheadings contained in this Agreement are included for convenience only, and shall not limit or otherwise affect the terms of this Agreement.',
          ],
        },
        {
          title: 'Copyright and Trademark Notices',
          textParagraphs: [
            'All contents of this Web Site, including all images produced by the Slooh system, are: Copyright ©2003- 2017 Slooh LLC, Washington Depot, CT and/or its suppliers, partners and contributors. All rights reserved.  The term “Slooh”, the Slooh logo, and other distinctive marks are trademarks of Slooh LLC.  Other product and company names mentioned herein may be the trademarks of their respective owners.',
          ],
        },
      ],
    },
    {
      title: 'Privacy',
      textParagraphs: [
        '<strong>Slooh Privacy Policy</strong>',
        'No financial transactions or sensitive financial data are ever stored on slooh.com servers. All financial exchanges occur on secure, SSL protected servers. When users submit sensitive information via the website, your information is protected both online and off-line.',
        '<strong>Email Addresses:</strong>',
        'We may collect your email address when you (i) choose to send us an email message, (ii) purchase one of our products. We may use your email address to respond to your inquiry and to communicate with you when necessary to provide customer service and/or follow-up information related to a product purchase or shipping information. In addition, we may email you occasionally to notify you of special offers or unique opportunities within Slooh.com.',
        '<strong>Postal Addresses:</strong>',
        'We may collect your postal address when you (i) choose to fill out one of our online forms to request information about our products and services, or (ii) purchase one of our products. We may use your postal address to respond to your inquiry and to communicate with you when necessary to provide customer service and/or follow-up information related to a product purchase or shipping information.',
        '<strong>Telephone Numbers:</strong>',
        'We may collect your telephone number when you (i) request that we contact you by telephone, or (ii) choose to fill out one of our online forms to request information about our products and services, or (iii) purchase one of our products and we need to communicate with you about billing or shipping information.',
        '<strong>We do not sell or rent customer information to third parties.</strong>',
        'As you browse our website, advertising cookies will be placed on your computer so that we can understand what you are interested in. Our display advertising partner, AdRoll, then enables us to present you with retargeting advertising on other sites based on your previous interaction with Slooh. The techniques our partners employ do not collect personal information such as your name, email address, postal address, or telephone number. You can visit this page [link to http://www.networkadvertising.org/choices/] to opt out of AdRoll’s and their partners’ targeted advertising.',
      ],
      paragraphAnchor: 'privacy',
    },
    {
      title: 'Known Bugs',
      textParagraphs: [
        'During the beta phase of our new website we are working to eliminate all known bugs.  Here are those we’re currently aware of:',
        [
          'Some versions of Internet Explorer may not load the site.',
          'FITS notification emails aren’t being sent at present.',
          'My Pictures filtering doesn’t operate when it “Mission” view.',
          'Reservations below the “Soft Horizon” are currently disallowed rather than receiving a low-altitude warning.',
          'When making a coordinate reservation using the Edge browser, coordinates are entered, "Check Visibility" used with "Good News" returned, processing option selected, but when the "Schedule Mission" button is pressed the coordinate entry fields turn red with a warning "You must enter a valid value".',
          'The navigation bar disappears when viewing some Road Trip pages.',
        ],
        'You can keep track of or submit your own beta bug reports here: <a href="https://slooh.com/#/discussions/forums/187/topics/285">https://slooh.com/#/discussions/forums/187/topics/285</a>',
      ],
      paragraphAnchor: 'bugs',
    },
  ],
};

export default createReducer(initialState, {
  [SET_HELP_PAGE_ANCHOR](state, { anchor }) {
    return {
      ...state,
      anchor,
    };
  },
});
