"use client";
import UpworkIdentity from "@/components/UpworkIdentity";
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";
import type { ProfileReport } from "@/types/api";
import type { RoutesInfo } from "@/hooks/url";

interface ResourcesDropdownContentProps {
  listOfdata: ProfileReport | null;
  urlInfo: RoutesInfo | null;
}

/** Inner content of the Resources dropdown, shared by desktop and the mobile sidebar. */
const ResourcesDropdownContent = ({
  listOfdata,
  urlInfo,
}: ResourcesDropdownContentProps) => (
  <>
    <div>
      <UpworkIdentity data={listOfdata} columnFormat={true} Header={true} />
    </div>
    {/* Work Proof */}
    <div className="w-full">
      <div className={`flex items-center gap-[1.4rem]`}>
        <WorkProofLinks
          props={{
            // upwork: listOfdata?.upwork,
            github: listOfdata?.github,
            linkedIn: listOfdata?.linkedIn,
            behance_link: listOfdata?.behance_link,
            u: urlInfo?.u,
          }}
        />
      </div>
      <p className={`text-[1.4rem] font-normal  text-paragraph1 mt-[1.6rem] `}>
        My Work Proof
      </p>
    </div>
    {!urlInfo?.u && (
      <>
        <hr className="h-[0.1rem] w-full bg-border" />
        {/* Contact Me */}
        <div className="w-full">
          <div className="flex items-center gap-[1.4rem] ">
            <ContactMeLinks
              props={{
                email: listOfdata?.email,
                phone_no: listOfdata?.phone_no,
              }}
            />
          </div>
          <p className="text-[1.4rem] font-normal text-paragraph1 mt-[1.6rem]">
            Contact Me
          </p>
        </div>
      </>
    )}
  </>
);

export default ResourcesDropdownContent;
