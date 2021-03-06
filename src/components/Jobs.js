import React from "react"
import Title from "./Title"
import { FaAngleDoubleRight } from "react-icons/fa"
import { graphql, useStaticQuery } from "gatsby"
import { resumeURL } from "../constants/socialLinks"

const query = graphql`
  {
    allStrapiJobs(sort: { fields: strapiId, order: DESC }) {
      nodes {
        Company
        Date
        Position
        desc {
          id
          name
        }
        strapiId
      }
    }
  }
`

const Jobs = () => {
  const data = useStaticQuery(query)
  const {
    allStrapiJobs: { nodes: jobs },
  } = data
  const [value, setValue] = React.useState(0)
  const { Company, Position, Date, desc } = jobs[value]

  return (
    <section className="section jobs">
      <Title title="Experience" />
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {jobs.map((item, index) => {
            return (
              <button
                key={item.strapiId}
                onClick={() => setValue(index)}
                className={`job-btn ${index === value && "active-btn"}`}
              >
                {item.Company}
              </button>
            )
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{Position}</h3>
          <h4>{Company}</h4>
          <p className="job-date">{Date}</p>
          {desc.map(job => {
            return (
              <div key={job.id} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{job.name}</p>
              </div>
            )
          })}
        </article>
      </div>
      <a href={resumeURL} className="btn center-btn" target="_blank">
        Resume
      </a>
    </section>
  )
}

export default Jobs
