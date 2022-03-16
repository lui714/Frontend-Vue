import gql from 'graphql-tag'
export const zapato = gql`
query Data($zapatoIdId: ID!) {
  zapatoId(id: $zapatoIdId) {
    data {
      ... on Zapato {
        id
        marca
        modelo
        publishedDate
        longDescription
        thumbnailUrl
        precio
        status
        tallas
      }
    }
  }
}
`