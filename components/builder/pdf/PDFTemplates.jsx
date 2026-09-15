import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register standard fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica' },
    { src: 'Helvetica-Bold', fontWeight: 'bold' },
    { src: 'Helvetica-Oblique', fontStyle: 'italic' },
  ]
});

Font.register({
  family: 'Courier',
  fonts: [
    { src: 'Courier' },
    { src: 'Courier-Bold', fontWeight: 'bold' },
    { src: 'Courier-Oblique', fontStyle: 'italic' },
  ]
});

Font.register({
  family: 'Times-Roman',
  fonts: [
    { src: 'Times-Roman' },
    { src: 'Times-Bold', fontWeight: 'bold' },
    { src: 'Times-Italic', fontStyle: 'italic' },
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
  },
  
  // Typewriter Styles
  tw_name: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 22,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    lineHeight: 1.2,
  },
  tw_title: {
    fontFamily: 'Courier',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 2,
  },
  tw_contactLine: {
    fontFamily: 'Courier',
    fontSize: 9,
    color: '#444444',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    gap: 12,
  },
  tw_line: {
    height: 1.5,
    backgroundColor: '#000000',
    marginTop: 12,
    marginBottom: 12,
  },
  tw_summary: {
    fontFamily: 'Courier',
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 16,
  },
  tw_sectionHeader: {
    fontFamily: 'Courier-Bold',
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 4,
    marginBottom: 8,
    marginTop: 8,
  },
  tw_expBlock: {
    marginBottom: 12,
  },
  tw_expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  tw_roleRow: {
    flexDirection: 'row',
  },
  tw_role: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
  },
  tw_company: {
    fontFamily: 'Helvetica',
    fontSize: 11,
  },
  tw_dates: {
    fontFamily: 'Courier',
    fontSize: 9,
  },
  tw_bullet: {
    fontFamily: 'Courier',
    fontSize: 10,
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 8,
  },
  tw_bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  tw_bulletText: {
    flex: 1,
    lineHeight: 1.4,
  },
  tw_eduBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  tw_eduText: {
    fontFamily: 'Helvetica',
    fontSize: 10.5,
  },
  tw_skillsText: {
    fontFamily: 'Courier',
    fontSize: 10,
    lineHeight: 1.5,
  },

  // Ledger Styles
  lg_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 1.5,
    borderBottomColor: '#000000',
    paddingBottom: 8,
    marginBottom: 12,
  },
  lg_name: {
    fontFamily: 'Times-Bold',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  lg_title: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 2,
  },
  lg_contact: {
    fontFamily: 'Helvetica',
    fontSize: 8.5,
    textAlign: 'right',
    lineHeight: 1.3,
  },
  lg_summary: {
    fontFamily: 'Times-Italic',
    fontSize: 10.5,
    lineHeight: 1.4,
    marginBottom: 16,
  },
  lg_tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 4,
    marginBottom: 6,
  },
  lg_thRole: { width: '40%', fontFamily: 'Helvetica-Bold', fontSize: 8, textTransform: 'uppercase', letterSpacing: 1 },
  lg_thCompany: { width: '35%', fontFamily: 'Helvetica-Bold', fontSize: 8, textTransform: 'uppercase', letterSpacing: 1 },
  lg_thDates: { width: '25%', fontFamily: 'Helvetica-Bold', fontSize: 8, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'right' },
  lg_tr: {
    flexDirection: 'row',
    paddingTop: 6,
    paddingBottom: 2,
  },
  lg_tdRole: { width: '40%', fontFamily: 'Helvetica-Bold', fontSize: 10 },
  lg_tdCompany: { width: '35%', fontFamily: 'Helvetica', fontSize: 10 },
  lg_tdDates: { width: '25%', fontFamily: 'Helvetica', fontSize: 10, textAlign: 'right' },
  lg_bulletsRow: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    paddingBottom: 8,
    marginBottom: 4,
  },
  lg_bullet: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 8,
  },
  lg_bulletPoint: {
    width: 12,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  lg_bulletText: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.3,
  },
  lg_grid: {
    flexDirection: 'row',
    marginTop: 8,
  },
  lg_col: {
    width: '50%',
    paddingRight: 10,
  },
  lg_sectionHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 3,
    marginBottom: 6,
  },
  lg_eduBlock: {
    marginBottom: 6,
  },
  lg_eduDegree: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    marginBottom: 1,
  },
  lg_eduDetails: {
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  lg_skillsText: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },

  // Cover Letter Styles
  cl_name: {
    fontFamily: 'Times-Bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  cl_contact: {
    fontFamily: 'Courier',
    fontSize: 9,
    flexDirection: 'row',
    marginTop: 4,
    gap: 12,
  },
  cl_line: {
    height: 1.5,
    backgroundColor: '#000000',
    marginTop: 16,
    marginBottom: 16,
  },
  cl_body: {
    fontFamily: 'Courier',
    fontSize: 10.5,
    lineHeight: 1.5,
    marginBottom: 12,
  },
  cl_signoff: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
    marginTop: 20,
  }
});

// Components
const ContactInfo = ({ personal, style }) => (
  <View style={style}>
    {personal.email && <Text>{personal.email}</Text>}
    {personal.phone && <Text>{personal.phone}</Text>}
    {personal.location && <Text>{personal.location}</Text>}
    {personal.website && <Text>{personal.website}</Text>}
  </View>
);

export const PDFTypewriterResume = ({ personal, summary, experience, education, skills }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.tw_name}>{personal.name}</Text>
      <Text style={styles.tw_title}>{personal.title}</Text>
      <ContactInfo personal={personal} style={styles.tw_contactLine} />
      <View style={styles.tw_line} />
      
      <Text style={styles.tw_summary}>{summary}</Text>

      {experience?.length > 0 && (
        <>
          <Text style={styles.tw_sectionHeader}>Experience</Text>
          {experience.map(exp => (
            <View key={exp.id} style={styles.tw_expBlock} wrap={false}>
              <View style={styles.tw_expHeader}>
                <View style={styles.tw_roleRow}>
                  <Text style={styles.tw_role}>{exp.role || "Role"} </Text>
                  <Text style={styles.tw_company}>— {exp.company || "Company"}</Text>
                </View>
                <Text style={styles.tw_dates}>{exp.start} – {exp.end}</Text>
              </View>
              {exp.bullets.filter(Boolean).map((b, i) => (
                <View key={i} style={styles.tw_bullet}>
                  <Text style={styles.tw_bulletPoint}>*</Text>
                  <Text style={styles.tw_bulletText}>{b}</Text>
                </View>
              ))}
            </View>
          ))}
        </>
      )}

      {education?.length > 0 && (
        <>
          <Text style={styles.tw_sectionHeader}>Education</Text>
          {education.map(ed => (
            <View key={ed.id} style={styles.tw_eduBlock} wrap={false}>
              <Text style={styles.tw_eduText}>{ed.degree || "Degree"} — {ed.school || "School"}</Text>
              <Text style={styles.tw_dates}>{ed.start} – {ed.end}</Text>
            </View>
          ))}
        </>
      )}

      {skills?.length > 0 && (
        <View wrap={false}>
          <Text style={styles.tw_sectionHeader}>Skills</Text>
          <Text style={styles.tw_skillsText}>{skills.join("  /  ")}</Text>
        </View>
      )}
    </Page>
  </Document>
);

export const PDFLedgerResume = ({ personal, summary, experience, education, skills }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.lg_header}>
        <View>
          <Text style={styles.lg_name}>{personal.name}</Text>
          <Text style={styles.lg_title}>{personal.title}</Text>
        </View>
        <View style={styles.lg_contact}>
          {personal.email && <Text>{personal.email}</Text>}
          {personal.phone && <Text>{personal.phone}</Text>}
          {personal.location && <Text>{personal.location}</Text>}
        </View>
      </View>

      <Text style={styles.lg_summary}>{summary}</Text>

      {experience?.length > 0 && (
        <View>
          <View style={styles.lg_tableHeader}>
            <Text style={styles.lg_thRole}>Role</Text>
            <Text style={styles.lg_thCompany}>Company</Text>
            <Text style={styles.lg_thDates}>Dates</Text>
          </View>
          {experience.map(exp => (
            <View key={exp.id} wrap={false}>
              <View style={styles.lg_tr}>
                <Text style={styles.lg_tdRole}>{exp.role || "Role"}</Text>
                <Text style={styles.lg_tdCompany}>{exp.company || "Company"}</Text>
                <Text style={styles.lg_tdDates}>{exp.start}–{exp.end}</Text>
              </View>
              <View style={styles.lg_bulletsRow}>
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <View key={i} style={styles.lg_bullet}>
                    <Text style={styles.lg_bulletPoint}>—</Text>
                    <Text style={styles.lg_bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={styles.lg_grid}>
        {education?.length > 0 && (
          <View style={styles.lg_col} wrap={false}>
            <Text style={styles.lg_sectionHeader}>Education</Text>
            {education.map(ed => (
              <View key={ed.id} style={styles.lg_eduBlock}>
                <Text style={styles.lg_eduDegree}>{ed.degree || "Degree"}</Text>
                <Text style={styles.lg_eduDetails}>{ed.school || "School"} · {ed.start}–{ed.end}</Text>
              </View>
            ))}
          </View>
        )}
        
        {skills?.length > 0 && (
          <View style={styles.lg_col} wrap={false}>
            <Text style={styles.lg_sectionHeader}>Skills</Text>
            <Text style={styles.lg_skillsText}>{skills.join(", ")}</Text>
          </View>
        )}
      </View>
    </Page>
  </Document>
);

export const PDFCoverLetter = ({ personal, cover }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.cl_name}>{personal.name}</Text>
      <ContactInfo personal={personal} style={styles.cl_contact} />
      <View style={styles.cl_line} />
      
      <Text style={styles.cl_body}>{cover.date}</Text>
      <Text style={styles.cl_body}>{cover.recipient}</Text>
      <Text style={styles.cl_body}>{cover.company}</Text>
      
      <Text style={styles.cl_body}>{cover.salutation}</Text>
      
      {cover.body?.split('\n').map((paragraph, i) => (
        <Text key={i} style={styles.cl_body}>{paragraph}</Text>
      ))}
      
      <Text style={styles.cl_body}>{cover.closing}</Text>
      <Text style={styles.cl_signoff}>{personal.name}</Text>
    </Page>
  </Document>
);
