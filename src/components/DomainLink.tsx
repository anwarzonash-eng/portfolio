import Link from "next/link";

function DomainLink({ child, href }) {
  //  const storedIsU = localStorage.getItem("u");
  const uniqueID = localStorage.getItem("uniqueID");
  const modifiedHREF = `${uniqueID}/${href}`;
  return <Link href={modifiedHREF}>{child}</Link>;
}

export default DomainLink;
