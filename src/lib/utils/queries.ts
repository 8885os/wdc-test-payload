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

export const WORK_QUERY = `
  query {
    Works {
      docs {
        id
        title
        slug
        summary
        content {
          __typename

          ... on Hero {
            image {
              url
              alt
            }
          }

          ... on RichText {
            content
          }

          ... on ImageGrid {
            images {
              image {
                url
                alt
              }
            }
          }

          ... on OtherProjects {
            info
          }

          ... on Contact {
            info
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
