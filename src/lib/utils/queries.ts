export const PAGE_QUERY = `
  query {
  Pages {
    docs {
      id
      title
      slug
      layout {
        __typename
        ... on Hero {
          heading
          subheading
          image {
            url
            alt
          }
          button {
            label
            link
          }
        }
      }
    }
  }
}
`
export const GLOBAL_QUERY = `
  query {
    Header {
      logo {
        url
      }
      navigationItems {
        label
        link
      }
    }
    Sidebar {
      logo {
        url
        alt
      }
      socialIcons {
        image {
          url
          alt
        }
          link
      }
    }
}
`
