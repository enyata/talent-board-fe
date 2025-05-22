import TalentComponent from "./components/talent-component";


const TalentPage = async ({
  params,
}: {
  params: Promise<{ talent: string }>;
}) => {
  const { talent } = await params;
  console.log('resolvedParams at talent page', talent)
  return (
    <>
      <TalentComponent talentID={talent} />
    </>
  );
};

export default TalentPage;
