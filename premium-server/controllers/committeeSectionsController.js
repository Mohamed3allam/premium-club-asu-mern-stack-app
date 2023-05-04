const Committee = require('../models/committees/Committee');
const CommitteeSection = require('../models/committees/CommitteeSection')
require('dotenv').config()

const createCommitteeSection = async (req, res) => {

    const committee_id = req.params.committeeId
    const { committee_section_title, committee_section_description, committee_section_font_color, committee_section_bg_color } = req.body;

    try {
        const committee = await Committee.findById(committee_id)
        // Loop Ordering to find which ordering number is available
        let i=1;
        for( i;await CommitteeSection.findOne({ committee_id:committee_id , committee_section_ordering:i });i++ ) {
            i = i++
            console.log(`${committee.committee_name} committee, number ${i}`)
        }
        // Check if committee sections is over limit (5)
        const committeeSectionLength = await CommitteeSection.countDocuments({committee_id:committee._id})
        if (committeeSectionLength >= 5) {
            res.status(400).json({error:"You Can't Add anymore sections for this committee."})
            return 0
        }
        // Create the section finally
        const committeeSection = await CommitteeSection.create({ 
            committee_id: committee_id,
            committee_section_title, 
            committee_section_description, 
            committee_section_font_color, 
            committee_section_bg_color, 
            committee_section_ordering:i 
        })
        const committeeSections = await CommitteeSection.find({committee_id:committee_id})
        
        await Committee.findByIdAndUpdate(committee_id, {committee_sections: committeeSections})
        const committeeAfter = await Committee.findById(committee_id)

        res.status(200).json({committeeSection:committeeSection, committee:committeeAfter})

    } catch (err) {
        console.log(err)
        res.status(400).json({error:err})
    }
}

const editCommitteeSection = async (req, res, next) => {
    
    const committeeSectionId = req.params.committeeSectionId
    const committee_section = await CommitteeSection.findById(committeeSectionId)
    
    const committeeId = committee_section.committee_id

    const updatedData = req.body
    console.log(req.body)
    try {
        if (updatedData.committee_section_ordering && await CommitteeSection.findOne({committee_id: committeeId, committee_section_ordering:updatedData.committee_section_ordering})) {
            res.status(400).json({error: "Other committee section already ordered " + updatedData.committee_section_ordering})
            return 0
        }
        let i=1;
        for(i;await CommitteeSection.findOne({committee_section_ordering:i});i++) {
            i = i++
            console.log('committee section ' + i)
        }
        const committeeSection = await CommitteeSection.findByIdAndUpdate(committeeSectionId, updatedData)
        const committee = await Committee.findByIdAndUpdate(committeeId, {committee_sections: await CommitteeSection.find({committee_id:committeeId})})

        console.log(committeeSection)
        res.status(200).json({committee: committee, committeeSection: committeeSection})
    } catch (err) {
        console.log(err)
        return res.status(400).json({error:err})
    }
}

const getCommitteeSections = async ( req, res ) => {
    const committeeId = req.params.committeeId
    const committee = await Committee.findById(committeeId)

    try {
        const committeeSections = await CommitteeSection.find({ committee_id: committee._id }).sort({committee_section_ordering: 1})
        console.log('Fetch Requested')
        res.status(200).json(committeeSections)
    } catch (err) {
        return res.status(404).json({error:err})
    }
}

const getSingleCommitteeSection = async ( req, res ) => {
    const committeeSectionId = req.params.committeeSectionId

    try {
        const committeeSection = await CommitteeSection.findById(committeeSectionId)
        res.status(200).json(committeeSection)
    } catch (err) {
        return res.status(404).json({error:err})
    }
}

const getAllCommitteeSections = async ( req, res ) => {
    try {
        const committeeSections = await CommitteeSection.find({}).sort({committee_id: 1})
        res.status(200).json(committeeSections)
    } catch (err) {
        return res.status(404).json({error: err})
    }
}

const deleteCommitteeSection = async (req, res) => {
    const committeeSectionId = req.params.committeeSectionId
    const committeeSection = await CommitteeSection.findById(committeeSectionId)
    const committee = await Committee.findById(committeeSection.committee_id)
    try {
        const committeeSectionRemoval = await CommitteeSection.findByIdAndDelete(committeeSectionId)
        const committeeUpdate = await Committee.findByIdAndUpdate(committee._id, {committee_sections: await CommitteeSection.find({committee_id: committee._id})})
        console.log('Section Deleted')
        res.status(200).json({message:"Committee Section Deleted"})
    } catch (err) {
        return res.status(400).json({error: err})
    }
}

module.exports = {
    createCommitteeSection,
    editCommitteeSection,
    getCommitteeSections,
    getSingleCommitteeSection,
    getAllCommitteeSections,
    deleteCommitteeSection
}