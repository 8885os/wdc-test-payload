export const PAGE_QUERY = `
  query PageBySlug($slug: String) {
    Pages(where: { slug: { equals: $slug } }) {
      docs {
        id
        title
        slug
        layout {
          __typename
          ... on PageHero {
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
          ... on SecondaryHero {
            heading
          }
        }
      }
    }
  }
`

export const WORK_QUERY = `
  query WorkBySlug($slug: String, $draft: Boolean) {
    Works(where: { slug: { equals: $slug } }, draft: $draft) {
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
