import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { fetchNotifications, getLoggedUser } from "@/lib/data";

const index = () => {
  return (
    <div className="flex flex-col items-center my-10">
      <h2 className="text-3xl my-10">ALFASIM DATA USER AGREEMENT</h2>
      <div className="mx-10 md:mx-20 lg:mx-30">
        <div className="mb-20">
          <h3 className="mb-5">1. ACCEPTANCE OF TERMS</h3>
          <p>
            ALFASIM DATA provides a collection of online resources, including
            but not limited to data bundle internet/mobile browsing, air
            time/recharge cards, classified ads, forums, and various email
            services, (referred to hereafter as "the Service") subject to the
            following Terms of Use ("TOU"). By using the Service in any way, you
            are agreeing to comply with the TOU. In addition, when using
            particular ALFASIM DATA services, you agree to abide by any
            applicable posted guidelines for all ALFASIM DATA services, which
            may change from time to time. Should you object to any term or
            condition of the TOU, any guidelines, or any subsequent
            modifications thereto or become dissatisfied with ALFASIM DATA in
            any way, your only recourse is to immediately discontinue use of
            ALFASIM DATA. ALFASIM DATA has the right, but is not obligated, to
            strictly enforce the TOU through self-help, community moderation,
            active investigation, litigation and prosecution.
          </p>
        </div>
        <div className="mb-20">
          <h3 className="mb-5">2. MODIFICATIONS TO THIS AGREEMENT</h3>
          <p>
            We reserve the right, at our sole discretion, to change, modify or
            otherwise alter these terms and conditions at any time. Such
            modifications shall become effective immediately upon the posting
            thereof. You must review this agreement on a regular basis to keep
            yourself apprised of any changes.
          </p>
        </div>
        {/* conduct */}
        <div className="mb-20">
          <h3 className="mb-5">3. CONDUCT</h3>
          <div>
            <p className="font-bold">You agree not to:</p>
            <p className="my-5">
              (1) create multiple account or violate any
              prohibition/restriction/limit placed on accounts on our website as
              this will lead to termination of your account and you will forfeit
              all funds in your account;
            </p>{" "}
            <p>
              (2) contact anyone who has asked not to be contacted, or make
              unsolicited contact with anyone for any commercial purpose;{" "}
            </p>{" "}
            <p className="my-5">(3) "Stalk" or otherwise harass anyone; </p>{" "}
            <p>
              (4) collect personal data about other users for commercial or
              unlawful purposes;
            </p>{" "}
            <p className="my-5">
              (5) Use automated means, including spiders, robots, crawlers, data
              mining tools, or the like to download data from the Service -
              unless expressly permitted by ALFASIM DATA;
            </p>{" "}
            <p>
              (6) Post non-local or otherwise irrelevant Content, repeatedly
              post the same or similar Content or otherwise impose an
              unreasonable or is proportionately large load on our
              infrastructure;{" "}
            </p>
            <p className="my-5">
              (7) Post the same item or service in more than one classified
              category or forum, or in more than one metropolitan area;{" "}
            </p>
            <p>
              (8) attempt to gain unauthorized access to ALFASIM DATA's computer
              systems or engage in any activity that disrupts, diminishes the
              quality of, interferes with the performance of, or impairs the
              functionality of, the Service or the website; or
            </p>
            <p className="my-5">
              (9) Use any form of automated device or computer program that
              enables the Submission of postings on ALFASIM DATA without each
              posting being manually entered by the author thereof (an
              "automated posting device"), including without limitation, the use
              of any such automated posting device to submit postings in bulk,
              or for automatic submission of postings at regular intervals.
            </p>
            <p>
              {" "}
              (10) Use any form of automated device or computer program
              ("flagging tool") that enables the use of ALFASIM DATA's "flagging
              system" or other community moderation systems without each flag
              being manually entered by the person that initiates the flag (an
              "automated flagging device"), or use the flagging tool to remove
              posts of competitors, or to remove posts without a good faith
              belief that the post being flagged violates these TOU;
              Additionally, you agree not to post, email, or otherwise make
              available Content:{" "}
            </p>
            <p className="my-5">
              {" "}
              (11) that is unlawful, harmful, threatening, abusive, harassing,
              defamatory, libelous, invasive of another's privacy, or is harmful
              to minors in any way;{" "}
            </p>
            <p>
              (12) that is pornographic or depicts a human being engaged in
              actual sexual conduct including but not limited to (i) sexual
              intercourse, including genital-genital, oral-genital,
              anal-genital, or oral-anal, whether between persons of the same or
              opposite sex, or (ii) bestiality, or (iii) masturbation, or (iv)
              sadistic or masochistic abuse, or (v) lascivious exhibition of the
              genitals or pubic area of any person;{" "}
            </p>
            <p className="my-5">
              (13) That harasses, degrades, intimidates or is hateful toward an
              individual or group of individuals on the basis of religion,
              gender, sexual orientation, race, ethnicity, age, or disability;{" "}
            </p>
            <p>
              (14) That violates the Fair Housing Act by stating, in any notice
              or ad for the sale or rental of any dwelling, a discriminatory
              preference based on race, color, national origin, religion, sex,
              familial status or handicap (or violates any state or local law
              prohibiting discrimination on the basis of these or other
              characteristics);{" "}
            </p>
            <p className="my-5">
              (15) That violates federal, state, or local equal employment
              opportunity laws, including but not limited to, stating in any
              advertisement for employment a preference or requirement based on
              race, color, religion, sex, national origin, age, or disability.
            </p>
            <p>
              (16) With respect to employers that employ four or more employees,
              that violates the anti-discrimination provision of the Immigration
              anNationality Act, including requiring Nigeria citizenship or
              lawful permanent residency (green card status) as a condition for
              employment unless otherwise required in order to comply with law,
              regulation, executive order, or federal, state, or local
              government contract.{" "}
            </p>
            <p className="my-5">
              (17) That impersonates any person or entity, including, but not
              limited to, a ALFASIM DATA employee, or falsely states or
              otherwise misrepresents your affiliation with a person or entity
              (this provision does not apply to Content that constitutes lawful
              non-deceptive parody of public figures.);{" "}
            </p>
            <p>
              (18) That includes personal or identifying information about
              another person without that person's explicit consent;{" "}
            </p>
            <p className="my-5">
              (19) that is false, deceptive, misleading, deceitful,
              mis-informative, or constitutes "bait and switch";{" "}
            </p>
            <p>
              (20) that infringes any patent, trademark, trade secret, copyright
              or other proprietary rights of any party, or Content that you do
              not have a right to make available under any law or under
              contractual or fiduciary relationships;{" "}
            </p>
            <p className="my-5">
              (21) That constitutes or contains "affiliate marketing," "link
              referral code," "junk mail," "spam," "chain letters," "pyramid
              schemes," or unsolicited commercial advertisement;{" "}
            </p>
            <p>
              (22) That constitutes or contains any form of advertising or
              solicitation if: posted in areas of the ALFASIM DATA sites which
              are not designated for such purposes; or emailed to ALFASIM DATA
              users who have not indicated in writing that it is ok to contact
              them about other services, products or commercial interests.
            </p>
            <p className="my-5">
              ( 23) That includes links to commercial services or web sites,
              except as allowed in "services";{" "}
            </p>
            <p>
              {" "}
              (24) That advertises any illegal service or the sale of any items
              the sale of which is prohibited or restricted by any applicable
              law, including without limitation items the sale of which is
              prohibited{" "}
            </p>
            <p className="my-5">
              (25) That contains software viruses or any other computer code,
              files or programs designed to interrupt, destroy or limit the
              functionality of any computer software or hardware or
              telecommunications equipment;
            </p>
            <p>
              ( 26) that disrupts the normal flow of dialogue with an excessive
              amount of Content (flooding attack) to the Service, or that
              otherwise negatively affects other users' ability to use the
              Service; or
            </p>
            <p className="my-5">
              {" "}
              (27) that employs misleading email addresses, or forged headers or
              otherwise manipulated identifiers in order to disguise the origin
              of Content transmitted through the Service.
            </p>
          </div>
        </div>
        {/*  NO SPAM POLICY */}
        <div className="mb-20">
          <h3 className="mb-5">4. NO SPAM POLICY</h3>
          <p>
            You understand and agree that sending unsolicited email
            advertisements to ALFASIM DATA email addresses or through computer
            systems, which is expressly prohibited by these Terms, will use or
            cause to be used servers located in California. Any unauthorized use
            of ALFASIM DATA computer systems
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;
