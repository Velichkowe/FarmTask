import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
    mutation updateUser(
        $userId: String!
        $isApproved: Int!
    ) {
        updateUser(
            userId: $userId
            isApproved: $isApproved
        ) {
            firstName lastName
        }
    }
`;

// export const updateUserApproval = (user) => {
// export const [updateUser, { data }] = useMutation(UPDATE_USER, {
//         onError(err) {
//             console.log('error', error)
//         },
//         onCompleted(asd) {
//             console.log('asd', asd)
//         }
//     });

    // updateUser({
    //     variables: {
    //         userId: user.userId,
    //         isApproved: !user.isApproved,
    //     }
    // });

    // return;
// }