import { Repo } from '../../@types/repo';

type QueryProps = {
    repo?: Repo;
};

export default function Info({ repo }: QueryProps) {
    return (
        <>
            <div>SOME REPO DATA HERE IT IS BOYYYYYY:</div>
            <div>{JSON.stringify(repo)}</div>
        </>
    );
}
