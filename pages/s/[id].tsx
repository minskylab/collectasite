import { useRouter } from "next/router";
import { NextPage } from "next";

const Survey: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	return <p>Survey: {id}</p>;
};

export default Survey;
