import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetPackageInfo = (packageNames) => {
	const { data: packagesInfo = [], isLoading: isPackageLoading } = useQuery({
		enabled: packageNames.length > 0,
		queryKey: ["packageInfo", packageNames],
		queryFn: async () => {
			const requests = packageNames.map((packageName) =>
				axios.get(
					`https://npm-downloads-count-nhb.vercel.app/package?packageName=${packageName}`
				)
			);
			const results = await Promise.all(requests);
			return results?.map((result) => result?.data);
		},
		refetchOnWindowFocus: false,
	});

	return { packagesInfo, isPackageLoading };
};

export default useGetPackageInfo;
