import React from 'react';
import { Link } from 'react-router';
import './Help.scss';

const TermsAndConditions = () => (
  <div>
    <div className="help-page-header">
      <h1 className="help-page-title">Terms and Conditions</h1>
      <Link to="/about/contact" className="button btn-primary help-page-button">
        Contact Us
      </Link>
    </div>
    <div className="help-page-inner">
      <div className="help-page-section">
        <div className="help-page-paragraph">
          The Slooh Member Agreement is a legal document that details your rights and obligations as a Slooh member. You cannot become a Slooh Member until you have accepted the terms of the Member Agreement. The Member Agreement provides very important information about your Slooh membership, so you should take the time to read and understand it. The Internet and online world is changing rapidly and as technology and Slooh’s business continue to evolve, these policies may have to be updated or revised. By joining Slooh and accepting the Member Agreement you agree that Slooh may change the terms of this Member Agreement. If you don’t agree to the changes proposed by Slooh, or to any of the terms in this Member Agreement, your only remedy is not to renew your Slooh membership. This Agreement is your entire agreement with Slooh and governs your use of Slooh’s online services.
        </div>
        <div className="help-page-paragraph">
          To be a Slooh member, you must be at least 18 years old.  If you are not yet eighteen years old, you may still use Slooh, but only if the account was created and registered by your parent or guardian.  When you accept this Agreement and complete the Slooh registration process, you become the “master account”  holder.  As the master account holder, you are responsible for all activity on your account. <strong>No sharing of a Slooh  account is permitted under any circumstances.</strong> A maximum of two accounts per household is permitted.  A maximum of one promotional account per household is permitted.  You agree not to reveal your password to anyone, and you agree to indemnify and hold Slooh harmless for any improper or illegal use of your account. <strong>Your account is at risk if you allow someone else to use it.</strong> If your membership is terminated for violating this Agreement, Slooh’s prior written permission will be necessary before you are allowed to use Slooh again.
        </div>
        <div className="help-page-paragraph">
          Any request for your password should be treated with appropriate suspicion – Slooh will never ask you for your password.
        </div>
        <div className="help-page-title help-page-paragraph">
          Membership
        </div>
        <div className="help-page-paragraph">
          Slooh Apprentice membership includes use of the telescopes to make five reservations per month from the “Slooh 500” object list, access to all Slooh event shows and the Space Situation Room feeds, access to Illuminations and other community content, and attend Slooh Road Trips. In addition, Slooh Apprentice members are entitled to participate in as many Editor Missions as are scheduled during the term of their membership, subject to the following rules:
          <ul>
            <li>Editor Missions are defined as looking through a telescope with all other logged-in members at objects according to a pre-planned schedule.</li>
            <li>Under normal hours of operation, missions will be available from roughly 30-minutes after sunset to 30-minutes before sunrise at the observatory location.</li>
            <li>Due to poor weather or mechanical failure, the telescopes may be not always be in operation.</li>
            <li>In order to preserve the quality of the experience, Slooh may suspend missions when imaging conditions are marginal.</li>
          </ul>
        </div>
        <div className="help-page-paragraph">
          Slooh Astronomer membership includes all the features of Apprentice membership, plus the ability to schedule any object in the night-sky (including coordinate reservations), additional member telescope time (Member Missions), which may be used at any time throughout the term of membership, subject to the following rules:
          <ul>
            <li>Member telescope time is defined as time spent in direct control of the telescope by a member, in which that member can choose from a list of celestial objects to view, or enter coordinates to point the telescope as desired.</li>
            <li>Member time must be reserved in advance, according to the schedule posted on the site.</li>
            <li><strong>Members may make unlimited reservations</strong>, but are limited to five pending reservations at any given time.  Once an existing reserved mission has run, another reservation can be made.  This policy may be adjusted at any time based on member load.</li>
            <li><strong>The total number of missions that may be reserved by a member during the term of their membership is unlimited.</strong></li>
          </ul>
        </div>
        <div className="help-page-paragraph">
          Slooh Astronomer membership also includes access to the Discussion Boards, the ability to make coordinate missions, and access to the raw FITS data.
        </div>
        <div className="help-page-paragraph">
          Slooh Apprentice members wishing to upgrade their membership to the Slooh Astronomer level may do so by emailing Customer Service.
        </div>

        <div className="help-page-title help-page-paragraph">
          Slooh Images
        </div>
        <div className="help-page-paragraph">
          Members have the ability to download images generated by Slooh.  Members agree not to use these images for any  commercial purpose, or remove the Slooh logo, without prior written approval from Slooh.  If cropping, animating, or other image processing causes the Slooh logo to be deleted or obscured, it must be replaced with a new logo,  available <strong><a href="https://polaris.slooh.com/files/Discussion_Board_Content/Slooh_Space_for_Everyone_Logos.zip">HERE</a></strong> in PNG format.  These logos must also be added to all images created using Slooh FITS data.  In all cases, the Slooh logo must be at least 100 pixels wide.  Members are permitted to publish such images or data online or in print media, provided the Slooh logo is included and clearly visible.
        </div>
        <div className="help-page-paragraph">
          If you publish images from another member’s mission you need to provide credit to them in the form of text on the image.
        </div>
        <div className="help-page-paragraph">
          <strong>Slooh members must not share Slooh FITS data outside of the membership under any circumstances.</strong> In order to safeguard members’ work, members may not share the FITS data from other members’ missions at all.
        </div>
        <div className="help-page-paragraph">
          <strong>Any submission of images or data obtained using Slooh’s service to organizations, agencies or groups (such as, but not limited to the IAU, CBAT, MPC, Yahoo groups, Facebook groups, BAA, etc.) must be coordinated through Slooh.  Prior written permission must be obtained from Slooh before such submissions are permitted (email: support@slooh.com).   This measure is intended to safeguard Slooh’s reputation relating to the accuracy and quality of submissions to 3rd party organisations.</strong>
        </div>

        <div className="help-page-title help-page-paragraph">
          Charges and Billing
        </div>
        <div className="help-page-paragraph">
          <strong>Memberships will be renewed automatically at the end of the subscription term, unless you cancel as described in the ‘Termination and Cancellation’ section below.</strong>
        </div>
        <div className="help-page-paragraph">
          You agree to authorize Slooh to make such recurring charges on or about the date of your renewal.  Slooh reserves the right to change our fees or billing methods at any time and Slooh will provide notice of any such change seven days in advance of your renewal.  If you do not agree with the changes in fees or billing methods, you may choose not to renew your membership, but Slooh will not refund any remaining portion of the previously paid subscription when you cancel your membership.  Former members who re-join Slooh will have to create a new account; images and other data from lapsed or cancelled accounts are not retrievable.
        </div>
        <div className="help-page-paragraph">
          As the account holder, you are responsible for all charges incurred, including applicable taxes, and all usage and purchases under your account.
        </div>
        <div className="help-page-paragraph">
          At some point, Slooh may offer certain premium services that incur an additional charge.  Slooh will provide notice of any additional charge before you select the premium service.  You are responsible for any charges for premium services incurred using your account.
        </div>
        <div className="help-page-paragraph">
          You are responsible and liable for any fees, including attorney and collection fees, that Slooh may incur in its efforts to collect any outstanding balances due from you.  You also agree that you will be billed for and will pay any outstanding balances if you cancel your membership or your account is terminated.  You must let us know about any billing problems or discrepancies within thirty days after they first appear on your account statement.  If you do not bring them to Slooh’s attention within thirty days, you agree that you waive your right to dispute such problems.
        </div>

        <div className="help-page-title help-page-paragraph">
          Discussion Boards/Forums/Chat
        </div>
        <div className="help-page-paragraph">
          The Slooh web site may contain, from time to time, discussion boards, galleries, chat rooms, or other message or communication facilities.  You agree to use these facilities only to send and receive messages and material that are proper and related to the particular facility.  By way of example, and not as a limitation, you agree that when using these facilities, you shall not:
        </div>
        <div className="help-page-paragraph">
          <ul>
            <li>Defame, abuse, harass, stalk, threaten, or otherwise violate the legal rights (such as rights of privacy and publicity) of others;</li>
            <li>Publish, post, distribute, or disseminate any defamatory, infringing, obscene, indecent, or unlawful material or information, or any material or information that promotes bigotry, racism or hatred;</li>
            <li>Upload files that contain software or other material protected by intellectual property laws (or by rights of privacy and publicity) unless you own or control the rights thereto or have received all necessary consents;</li>
            <li>Upload files that contain viruses, corrupted files, or any other similar software or programs that are intended to damage, detrimentally interfere with, surreptitiously intercept or expropriate any system, data or personal information, including email addresses;</li>
            <li>Delete any author attributions, legal notices, or proprietary designations or labels in any file that is uploaded;</li>
            <li>Falsify the origin or source of software or other material contained in a file that is uploaded;</li>
            <li>Advertise or offer to sell any goods or services;</li>
            <li>Conduct forward surveys, contests or chain letters;</li>
            <li>Download any file posted by another member that you know, or reasonably should know, cannot be legally distributed in such manner.</li>
          </ul>

        </div>
        <div className="help-page-paragraph">
          <strong>Violation of this clause may result in account termination without any refund of membership fees or other reimbursement.</strong>
        </div>
        <div className="help-page-paragraph">
          You acknowledge that Slooh’s website is public and not for private communications.  Accordingly, you agree not to post questions, requests or comments regarding your account, billing or related details in the Discussion Boards or elsewhere on the website.  You agree to submit such questions, requests or comments only by direct email to:
        </div>
        <div className="help-page-paragraph">
          <strong>Account Queries:</strong> <a href="mailto:custserv@slooh.com">custserv@slooh.com</a>
        </div>
        <div className="help-page-paragraph">
          <strong>Technical Support:</strong> <a href="mailto:support@slooh.com">support@slooh.com</a>
        </div>
        <div className="help-page-paragraph">
          Further, you acknowledge that chats, postings, conferences, and other communications by other users are not endorsed by Slooh, and such communications shall not be considered reviewed, screened, or approved by Slooh.  Slooh reserves the exclusive right to establish and modify the criteria for what constitutes offensive or objectionable content.  Further, you acknowledge that it is impossible for Slooh to know whether a posting represents a copyright violation or other infringement.  The provider of any such content is responsible for ensuring that such content does not violate any extant copyright.  Slooh reserves the right for any reason to remove without notice any content posted to the Discussion Boards or Illuminations.  Slooh reserves the right to deny in its sole discretion any user access to this website or any portion thereof without notice.  Once you post content on Slooh, you expressly grant Slooh the complete right to use, reproduce, modify, distribute, etc. the content in any form, anywhere.
        </div>

        <div className="help-page-title help-page-paragraph">
          Slooh License
        </div>
        <div className="help-page-paragraph">
          Slooh provides you with a limited license to use our website, which you agree to use in accordance with these rules.  You may not share, sub-license, rebroadcast or charge others to use or access this website or its content without first obtaining written permission from us.
        </div>
        <div className="help-page-paragraph">
          Training materials and all other content on Slooh’s websites or systems, including but not limited to the members’ Discussion Boards, is copyright Slooh LLC, Washington Depot, CT, and may not be copied or shared with any third party, organisation or person under any circumstances. <strong>Sharing or use of any training material or Slooh activity is not permitted outside of your Slooh membership.</strong>
        </div>
        <div className="help-page-paragraph">
          We will occasionally provide automatic upgrades to improve your online experience.
        </div>
        <div className="help-page-paragraph">
          You agree not to decompile, disassemble, or otherwise reverse-engineer this website or information contained in or on this website or any software contained therein, or to descramble a scrambled work, to decrypt an encrypted work, or otherwise to avoid, bypass, remove, deactivate, or impair technological measures meant to ensure proper authentication and authorization of legitimate users.  You agree not to access or write to the reservation system in any automated or semi-automated fashion; all member reservations must be made manually through the reservation pages.  You agree not to access the website or systems in any automated or semi-automated fashion in order to acquire images or data or otherwise use Slooh’s systems or website. <strong>Violation of this clause may result in account termination without any refund of membership fees or other reimbursement.</strong> Slooh Radio and the audio storytellers are the sole and exclusive property of Slooh LLC.  No recording or rebroadcast can be made without express written consent of Slooh LLC.
        </div>

        <div className="help-page-title help-page-paragraph">
          Warranty
        </div>
        <div className="help-page-paragraph">
          MEMBER EXPRESSLY AGREES THAT THE USE OF SLOOH AND THE SLOOH WEB SITE IS AT MEMBER’S SOLE RISK.  THE SLOOH SITE IS PROVIDED “AS IS” AND “AS AVAILABLE” FOR YOUR USE, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, UNLESS SUCH WARRANTIES ARE LEGALLY INCAPABLE OF EXCLUSION.  SLOOH PROVIDES THE SLOOH SERVICE ON A COMMERCIALLY REASONABLE BASIS AND DOES NOT GUARANTEE THAT MEMBERS WILL BE ABLE TO ACCESS OR USE THE SERVICE AT TIMES OR LOCATIONS OF THEIR CHOOSING, OR THAT SLOOH WILL HAVE ADEQUATE CAPACITY FOR THE SERVICE AS A WHOLE OR IN ANY SPECIFIC GEOGRAPHIC AREA.  YOUR SOLE AND EXCLUSIVE REMEDY FOR ANY OTHER DISPUTE WITH SLOOH IS THE CANCELLATION OF YOUR ACCOUNT.  IN NO CASE SHALL SLOOH BE LIABLE FOR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF SLOOH, THE INTERNET OR FOR ANY OTHER CLAIM RELATED IN ANY WAY TO YOUR MEMBERSHIP WITH SLOOH.  BECAUSE SOME STATES OR JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR THE LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, IN SUCH STATES OR JURISDICTIONS, SLOOH’S LIABILITY SHALL BE LIMITED TO THE EXTENT PERMITTED BY LAW.  SLOOH DOES NOT ENDORSE, WARRANT OR GUARANTEE ANY PRODUCT OR SERVICE OFFERED THROUGH SLOOH AND WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
        </div>

        <div className="help-page-title help-page-paragraph">
          Indemnification
        </div>
        <div className="help-page-paragraph">
          Upon a request by Slooh, you agree to defend, indemnify and hold harmless Slooh and its affiliated subsidiaries, employees, contractors, officers, directors, telecommunications providers and content providers from all liabilities, claims and expenses, including attorney’s fees, that arise from a breach of this Member Agreement for which you are responsible or from the use of Slooh or the Internet, or in connection with your transmission of any Content on Slooh.  Slooh reserves the right, at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by a Member.  In that event, the member shall have no further obligation to provide indemnification for Slooh in that matter.
        </div>

        <div className="help-page-title help-page-paragraph">
          Termination and Cancellation
        </div>
        <div className="help-page-paragraph">
          Either you or Slooh may terminate or cancel your membership at any time.  You understand and agree that the cancellation of your account is your sole right and remedy with respect to any dispute with Slooh.  This includes, but is not limited to, any dispute related to, or arising out of:
          <ul>
            <li>any term of this Agreement or Slooh’s enforcement or application of this Agreement;</li>
            <li>any policy or practice of Slooh, or Slooh’s enforcement or application of these policies;</li>
            <li>the content available through Slooh or the Internet or any change in content provided through Slooh;</li>
            <li>your ability to access and/or use Slooh; or</li>
            <li>the amount or type of fees, surcharges, applicable taxes, billing methods, or any change to the fees, applicable taxes, surcharges or billing methods.</li>
          </ul>
        </div>
        <div className="help-page-paragraph">
          If your membership is paid through PayPal, you must visit their site to cancel.  Otherwise, you can cancel your membership by using the facility on your My Account page.   If you cancel near the end of your billing period and are inadvertently charged for the next year’s fee please contact Slooh by email to have the charges reversed.  Slooh reserves the right to collect fees, surcharges or costs incurred before you cancel your Slooh membership.  In addition, you are responsible for any charges incurred to third-party vendors or content providers prior to your cancellation.
        </div>
        <div className="help-page-paragraph">
          In the event that your account is terminated or cancelled, no refund, including any membership fees, will be granted; no telescope time or other credits will be credited to you or can be converted to cash or other form of reimbursement.  Active Slooh Members may not allow former Members or other agents whose memberships have been terminated to use their accounts.
        </div>

        <div className="help-page-title help-page-paragraph">
          Law and Legal Notices
        </div>
        <div className="help-page-paragraph">
          The Member Agreement represents your entire agreement with Slooh.  You agree that this Member Agreement is not intended to confer and does not confer any rights or remedies upon any person other than the parties to this Agreement.  If any part of this Agreement is held invalid or unenforceable, that portion shall be construed in a manner consistent with applicable law to reflect, as nearly as possible, the original intentions of the parties, and the remaining portions shall remain in full force and effect.  The laws of New York, excluding its conflicts-of-law rules, govern this Agreement and your membership.  As noted above, member conduct may be subject to other local, state, national, and international laws.  You expressly agree that exclusive jurisdiction for any claim or dispute with Slooh or relating in any way to your membership or your use of Slooh resides in the courts of New York and you further agree and expressly consent to the exercise of personal jurisdiction in the courts of New York in connection with any such dispute including any claim involving Slooh or its affiliates, subsidiaries, employees, contractors, officers, directors, telecommunication providers and content providers.
        </div>
        <div className="help-page-paragraph">
          You agree to abide by U.S. and other applicable export control laws and not to transfer, by electronic transmission or otherwise, any content or software subject to restrictions under such laws to a national destination prohibited under such laws, without first obtaining, and then complying with, any requisite government authorization.  You further agree not to upload to Slooh any data or software that cannot be exported without prior written government authorization, including, but not limited to, certain types of encryption software.  This assurance and commitment shall survive termination of this agreement.
        </div>
        <div className="help-page-paragraph">
          The section headings and subheadings contained in this Agreement are included for convenience only, and shall not limit or otherwise affect the terms of this Agreement.
        </div>

        <div className="help-page-title help-page-paragraph">
          Copyright and Trademark Notices
        </div>
        <div className="help-page-paragraph">
          All contents of this Web Site, including all images produced by the Slooh system, are: Copyright ©2003- 2017 Slooh LLC, Washington Depot, CT and/or its suppliers, partners and contributors. All rights reserved.  The term “Slooh”, the Slooh logo, and other distinctive marks are trademarks of Slooh LLC.  Other product and company names mentioned herein may be the trademarks of their respective owners.
        </div>

      </div>
    </div>
  </div>
);

export default TermsAndConditions;
