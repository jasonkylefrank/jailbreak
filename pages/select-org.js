import styled from "styled-components";
import Layout from "../components/layout";


export default function SelectOrg() {
  return (
    <>
      This is the `SelectOrg` component!
    </>
  );
}

SelectOrg.getLayout = function getLayout(page) {
  return (
    <Layout title="Select org.">
      {page}
    </Layout>
  );
};
