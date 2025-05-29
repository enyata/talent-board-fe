import TalentComponent from "./components/talent-component";


const TalentPage = async ({
  params,
}: {
  params: Promise<{ talent: string }>;
}) => {
  const { talent } = await params;
  return (
    <>
      <TalentComponent talentID={talent} />
    </>
  );
};

export default TalentPage;
