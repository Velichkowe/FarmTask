import { gql } from "@apollo/client";

export const GET_LOGGED_USER = gql`
    query getLoggedUser {
        getLoggedUser {
            id firstName lastName email role {
                name
            }
        }
    }
`;
