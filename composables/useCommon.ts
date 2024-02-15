export default function useCommon() {
  return { navigateToPage }
}

const router = useRouter();

const navigateToPage = (page: string) => {
  router.push(page);
}
