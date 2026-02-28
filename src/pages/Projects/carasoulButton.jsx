import React from "react";
import styled from "styled-components";

const StyledPath = styled.path`
  stroke: ${(props) => props.theme.text};
`;

export const NextButton = ({ flip, onClick }) => {
  return (
    <button onClick={onClick}>
      <svg viewBox="0 0 67 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        {flip ? (
          <>
            <StyledPath
              d="M64.6865 13.2836H1.99996"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <StyledPath
              d="M1.99991 13.2836C8.68648 14.8507 21.5581 19.3015 19.5521 24.5672"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <StyledPath
              d="M64.6865 13.2836H1.99996"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <StyledPath
              d="M2.00003 13.2836C8.6866 11.7164 21.5582 7.26567 19.5523 2"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            {" "}
            <StyledPath
              d="M2.31348 13.2836H65"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <StyledPath
              d="M65.0001 13.2836C58.3135 14.8507 45.4419 19.3015 47.4479 24.5672"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <StyledPath
              d="M2.31348 13.2836H65"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <StyledPath
              d="M65 13.2836C58.3134 11.7164 45.4418 7.26567 47.4477 2"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </button>
  );
};
