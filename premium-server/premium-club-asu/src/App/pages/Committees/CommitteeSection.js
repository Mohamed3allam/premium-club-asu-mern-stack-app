import React from 'react'

const CommitteeSection = ({committeeSection}) => {
  return (
    <section key={committeeSection._id} className="committee-section" style={{backgroundColor:committeeSection.committee_section_bg_color }}>
        <div className="container">
            <div className="row pb-5" style={{color: committeeSection.committee_section_font_color}}>
                <div className="row py-5">
                    <h2 className="h2" style={{fontWeight: 900}}>
                        {committeeSection.committee_section_title}
                    </h2>
                </div>
                <div className="row pb-5">
                    <p className="allDescription">
                        {committeeSection.committee_section_description}
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CommitteeSection
