import { createTag, editTag, deleteTag } from '../../toolboxes/tags.toolbox';

const tagsFeeder = require('../../feeder/tags.feeder');

describe('CRUDing Tags by Member', () => {
  test('Cruding for Location Type', async () => {
    await createTag('@tagCategoryLocation', tagsFeeder.locationName, '@locationTag'); // for creating tags
    await editTag('@locationTag', tagsFeeder.newLocation, '@locationEditedTag');// for editing tags
    await deleteTag('@locationEditedTag', tagsFeeder.newLocation);// for deleting tags
  });

  test('Cruding for Department Type', async () => {
    await createTag('@tagCategoryDepartment', tagsFeeder.departmentName, '@departmentTag');
    await editTag('@departmentTag', tagsFeeder.newDepartment, '@departmentEditedTag');
    await deleteTag('@departmentEditedTag', tagsFeeder.newDepartment);
  });

  test('cruding for Role type', async () => {
    await createTag('@tagCategoryRole', tagsFeeder.roleName, '@roleTag');
    await editTag('@roleTag', tagsFeeder.newRole, '@roleEditedTag');
    await deleteTag('@roleEditedTag', tagsFeeder.newRole);
  });

  test('cruding for Custom type', async () => {
    await createTag('@tagCategoryCustom', tagsFeeder.customName, '@customTag');
    await editTag('@customTag', tagsFeeder.newCustom, '@customEditedTag');
    await deleteTag('@customEditedTag', tagsFeeder.newCustom);
  });
});
