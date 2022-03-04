import MsgList from "../components/MsgList";
import fetcher from "../fetcher";
import { Message, METHOD } from "../types";

const Home = ({ smsgs }: { smsgs: Message[] }) => (
  <>
    <h1>Todo List</h1>
    <MsgList smsgs={smsgs} />
  </>
);

export const getServerSideProps = async () => {
  const smsgs = await fetcher(METHOD.GET, "/messages");
  return {
    props: { smsgs },
  };
};

export default Home;
