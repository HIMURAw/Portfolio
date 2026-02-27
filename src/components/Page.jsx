import React from "react";
import styled from "styled-components";
import { Grid, PageHeader } from "./ui";

const StyledLayout = styled(Grid)`
  min-height: 100vh;
  padding-top: 120px;
  grid-template-rows: min-content auto;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(6, 1fr);
    padding-inline-start: 1rem;

  }
`;

export const Page = ({ children, header, id }) => {
  return (
    <StyledLayout id={`${(id || header).toLowerCase()}-page`}>
      <>
        <PageHeader>{header.toUpperCase()}</PageHeader>
        {children}
      </>
    </StyledLayout>
  );
};
