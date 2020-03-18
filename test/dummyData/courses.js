const createCourseSet = (coursename, language, learningFrom) => {
  return new Array(3).fill(null).map((el,i) => {
    return {
      name: `${coursename}${i+1}`,
      language: `${language}${i+1}`,
      countryFlag: 'FR',
      learningFrom: `${learningFrom}${i+1}`,
    }
  });
}


const adminCoursesSet1 = createCourseSet('adminCourse', 'french', 'english');

const modCoursesSet2 = createCourseSet('moderatorCourse', 'thai', 'italian');

const coursesSet3 = createCourseSet('user1Course', 'norwegian', 'dutch');

const coursesSet4 = createCourseSet('user2Course', 'japanese', 'russian');

const coursesSet5 = createCourseSet('user3Course', 'esperanto', 'dothraki');



exports.adminCoursesSet1 = adminCoursesSet1;
exports.modCoursesSet2 = modCoursesSet2;
exports.coursesSet3 = coursesSet3;
exports.coursesSet4 = coursesSet4;
exports.coursesSet5 = coursesSet5;
