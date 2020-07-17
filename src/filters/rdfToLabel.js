export function rdfToLabel (value) {
  const keymap = {
    'earl:passed': 'Voldoende',
    'earl:failed': 'Onvoldoende',
    'earl:cantTell': 'Onbekend',
    'earl:inapplicable': 'Niet van toepassing',
    'earl:untested': 'Niet getoetst',
    A: 'Niveau A',
    AA: 'Niveau AA',
    AAA: 'Niveau AAA',
    'wai:WCAG2A-Conformance': 'Niveau A',
    'wai:WCAG2AA-Conformance': 'Niveau AA',
    'wai:WCAG2AAA-Conformance': 'Niveau AAA'
  };
  return keymap[value]
}
