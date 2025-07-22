// // pages/members/[id].tsx
// // import { GetStaticPaths, GetStaticProps } from "next";
// import { getAllMemberIds, getMemberData } from "../../lib/members";

// type MemberProps = {
//   name: string;
//   intro: string;
//   info: string;
//   stack: string[];
//   content: string;
// };

// export default function MemberPage({ name, intro, info, stack, content }: MemberProps) {
//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>{name}</h1>
//       <p><strong>{intro}</strong></p>
//       <p>{info}</p>
//       <h4>기술 스택:</h4>
//       <ul>
//         {stack.map((tech) => (
//           <li key={tech}>{tech}</li> {/* 이후 아이콘으로 대체 가능 */}
//         ))}
//       </ul>
//       <hr />
//       <div>
//         <p>{content}</p>
//       </div>
//     </div>
//   );
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = getAllMemberIds();
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const memberData = getMemberData(params?.id as string);
//   return {
//     props: {
//       ...memberData,
//     },
//   };
// };
