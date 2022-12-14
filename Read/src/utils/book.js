export const FONT_SIZE_LIST = [
	{ fontSize: 12 },
	{ fontSize: 14 },
	{ fontSize: 16 },
	{ fontSize: 18 },
	{ fontSize: 20 },
	{ fontSize: 22 },
	{ fontSize: 24 }
]

export const FONT_FAMILY_LIST = [
	{font: 'Default'},
	{font: 'Asap'},
	{font: 'Balo2'},
	{font: 'Dancing Script'},
	{font: 'DMMono'},
	{font: 'Noto Serif'}
]

export const themeList = vue => {
	return [
		{
			alias: vue.$t('book.themeDefault'),
			name: 'Default',
			style: {
				body: {
					'color': '#3C5059',
					'background': '#CECECE',
					'padding-top': '40px !important',
					'padding-bottom': '40px !important'
				}
			}
		},
		{
			alias: vue.$t('book.themeGold'),
			name: 'Gold',
			style: {
				body: {
					'color': '#5C5B56',
					'background': '#C6C2b6',
					'padding-top': '40px !important',
					'padding-bottom': '40px !important'
				}
			}
		},
		{
			alias: vue.$t('book.themeEye'),
			name: 'Eye',
			style: {
				body: {
					'color': '#000000',
					'background': '#C0EDC6',
					'padding-top': '40px !important',
					'padding-bottom': '40px !important'
				}
			}
		},
		{
			alias: vue.$t('book.themeNight'),
			name: 'Nignt',
			style: {
				body: {
					'color': '#CECECE',
					'background': '#000000',
					'padding-top': '40px !important',
					'padding-bottom': '40px !important'
				}
			}
		}
	]
}

export const flatten = arr => {
	const res = []
	return res.concat(...arr.map(item => res.concat(item, ...flatten(item.subitems))))
}

export const categoryText = (category, vue) => {
  switch (category) {
    case 1:
      return vue.$t('category.computerScience')
    case 2:
      return vue.$t('category.socialSciences')
    case 3:
      return vue.$t('category.economics')
    case 4:
      return vue.$t('category.education')
    case 5:
      return vue.$t('category.engineering')
    case 6:
      return vue.$t('category.environment')
    case 7:
      return vue.$t('category.geography')
    case 8:
      return vue.$t('category.history')
    case 9:
      return vue.$t('category.laws')
    case 10:
      return vue.$t('category.lifeSciences')
    case 11:
      return vue.$t('category.literature')
    case 12:
      return vue.$t('category.biomedicine')
    case 13:
      return vue.$t('category.businessandManagement')
    case 14:
      return vue.$t('category.earthSciences')
    case 15:
      return vue.$t('category.materialsScience')
    case 16:
      return vue.$t('category.mathematics')
    case 17:
      return vue.$t('category.medicineAndPublicHealth')
    case 18:
      return vue.$t('category.philosophy')
    case 19:
      return vue.$t('category.physics')
    case 20:
      return vue.$t('category.politicalScienceAndInternationalRelations')
    case 21:
      return vue.$t('category.psychology')
    case 22:
      return vue.$t('category.statistics')
  }
}

export const categoryList = {
  'ComputerScience': 1,
  'SocialSciences': 2,
  'Economics': 3,
  'Education': 4,
  'Engineering': 5,
  'Environment': 6,
  'Geography': 7,
  'History': 8,
  'Laws': 9,
  'LifeSciences': 10,
  'Literature': 11,
  'Biomedicine': 12,
  'BusinessandManagement': 13,
  'EarthSciences': 14,
  'MaterialsScience': 15,
  'Mathematics': 16,
  'MedicineAndPublicHealth': 17,
  'Philosophy': 18,
  'Physics': 19,
  'PoliticalScienceAndInternationalRelations': 20,
  'Psychology': 21,
  'Statistics': 22
}


export function getCategoryName(id) {
  switch (id) {
    case 1:
      return 'ComputerScience'
    case 2:
      return 'SocialSciences'
    case 3:
      return 'Economics'
    case 4:
      return 'Education'
    case 5:
      return 'Engineering'
    case 6:
      return 'Environment'
    case 7:
      return 'Geography'
    case 8:
      return 'History'
    case 9:
      return 'Laws'
    case 10:
      return 'LifeSciences'
    case 11:
      return 'Literature'
    case 12:
      return 'Biomedicine'
    case 13:
      return 'BusinessandManagement'
    case 14:
      return 'EarthSciences'
    case 15:
      return 'MaterialsScience'
    case 16:
      return 'Mathematics'
    case 17:
      return 'MedicineAndPublicHealth'
    case 18:
      return 'Philosophy'
    case 19:
      return 'Physics'
    case 20:
      return 'PoliticalScienceAndInternationalRelations'
    case 21:
      return 'Psychology'
    case 22:
      return 'Statistics'
  }
}
