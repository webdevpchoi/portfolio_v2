import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { RichText } from "prismic-reactjs"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Button from "components/_ui/Button"
import About from "components/About"
import Layout from "components/Layout"
import ProjectCard from "components/ProjectCard"
import resume from "../../Phillip-Choi-Resume.pdf"

const Hero = styled("div")`
  padding-top: 2.5em;
  padding-bottom: 3em;
  margin-bottom: 6em;
  max-width: 830px;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    margin-bottom: 3em;
  }

  h1:nth-of-type(1) {
    a {
      &:nth-of-type(1) {
        color: ${colors.blue500};
      }

      &:hover {
        &:nth-of-type(1) {
          color: ${colors.blue600};
          background-color: ${colors.blue200};
        }
      }
    }
  }

  h1:nth-of-type(2) {
    a {
      &:nth-of-type(1) {
        color: ${colors.teal500};
      }
      &:nth-of-type(2) {
        color: ${colors.purple500};
      }
      &:nth-of-type(3) {
        color: ${colors.green500};
      }

      &:hover {
        &:nth-of-type(1) {
          color: ${colors.teal600};
          background-color: ${colors.teal200};
        }
        &:nth-of-type(2) {
          color: ${colors.purple600};
          background-color: ${colors.purple200};
        }
        &:nth-of-type(3) {
          color: ${colors.green600};
          background-color: ${colors.green200};
        }
      }
    }
  }

  h1:nth-of-type(3) {
    a {
      &:nth-of-type(1) {
        color: ${colors.orange500};
      }

      &:hover {
        &:nth-of-type(1) {
          color: ${colors.orange600};
          background-color: ${colors.orange200};
        }
      }
    }
  }
`

const Section = styled("div")`
  margin-bottom: 10em;
  display: flex;
  flex-direction: column;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin-bottom: 4em;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const WorkAction = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: currentColor;
  transition: all 150ms ease-in-out;
  margin-left: auto;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin: 0 auto;
  }

  span {
    margin-left: 1em;
    transform: translateX(-8px);
    display: inline-block;
    transition: transform 400ms ease-in-out;
  }

  &:hover {
    color: ${colors.blue500};
    transition: all 150ms ease-in-out;

    span {
      transform: translateX(0px);
      opacity: 1;
      transition: transform 150ms ease-in-out;
    }
  }
`

const RenderBody = ({ home, siteImage, projects, meta }) => (
  <>
    <Helmet
      title={meta.title}
      titleTemplate={`${meta.title}`}
      meta={[
        {
          name: `description`,
          content: meta.description,
        },
        {
          property: `og:title`,
          content: meta.title,
        },
        {
          property: `og:description`,
          content: meta.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: siteImage,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: meta.author,
        },
        {
          name: `twitter:title`,
          content: meta.title,
        },
        {
          name: `twitter:description`,
          content: meta.description,
        },
      ].concat(meta)}
    />
    <Hero>
      <>{RichText.render(home.hero_title)}</>
      <a href={resume} target="_blank" download rel="noopener noreferrer">
        <Button>{RichText.render(home.hero_button_text)}</Button>
      </a>
    </Hero>
    <Section>
      <h1>Clients I've worked with...</h1>
      {projects.map((project, i) => (
        <ProjectCard
          key={i}
          category={project.node.project_category}
          title={project.node.project_title}
          description={project.node.project_preview_description}
          thumbnail={project.node.project_preview_thumbnail}
          uid={project.node._meta.uid}
          link={project.node.project_link ? project.node.project_link.url : null}
        />
      ))}
      <WorkAction to={"/work"}>
        See more! <span>&#8594;</span>
      </WorkAction>
    </Section>
    <Section>
      {RichText.render(home.about_title)}
      <About bio={home.about_bio} socialLinks={home.about_links} />
    </Section>
  </>
)

export default ({ data }) => {
  // select specific homepage projects to show
  const homepageProjects = ['fashion nova', 'the ridge wallet', 'stikwood', 'alleyoop', 'the detox market' ];
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop();
  const projects = data.prismic.allProjects.edges.filter(project => homepageProjects.includes(project.node.project_title[0].text.toLowerCase()));
  const meta = data.site.siteMetadata;

  //Required check for no data being returned
  if (!doc || !projects) return null

  return (
    <Layout>
      <RenderBody siteImage={doc.node.site_image.url} home={doc.node} projects={projects} meta={meta} />
    </Layout>
  )
}

RenderBody.propTypes = {
  home: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
}

export const query = graphql`
  {
    prismic {
      allHomepages {
        edges {
          node {
            hero_title
            site_image
            hero_button_text
            hero_button_link {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
            }
            content
            about_title
            about_bio
            about_links {
              about_link
              link_icon {
                ... on PRISMIC__ImageLink {
                  _linkType
                  url
                }
              }
            }
          }
        }
      }
      allProjects {
        edges {
          node {
            project_title
            project_preview_description
            project_preview_thumbnail
            project_category
            project_post_date
            project_link {
              ... on PRISMIC__ExternalLink {
                url
              }
            }
            _meta {
              uid
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
