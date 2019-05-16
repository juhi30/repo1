import { createtags, editCreatedTags, deleteCreatedTags } from '../../toolboxes/tags.toolbox';

const tagsFeeder = require('../../feeder/tags.feeder');

describe('CRUDing Tags by Member', () => {
  test('Cruding for Location Type', async () => {
    await createtags('@tagCategoryLocation', tagsFeeder.locationName, '@locationTag'); // for creating tags
    await editCreatedTags('@locationTag', tagsFeeder.newLocation, '@locationEditedTag');// for editing tags
    await deleteCreatedTags('@locationEditedTag', tagsFeeder.newLocation);// for deleting tags
  });

  test('Cruding for Department Type', async () => {
    await createtags('@tagCategoryDepartment', tagsFeeder.departmentName, '@departmentTag');
    await editCreatedTags('@departmentTag', tagsFeeder.newDepartment, '@departmentEditedTag');
    await deleteCreatedTags('@departmentEditedTag', tagsFeeder.newDepartment);
  });

  test('cruding for Role type', async () => {
    await createtags('@tagCategoryRole', tagsFeeder.roleName, '@roleTag');
    await editCreatedTags('@roleTag', tagsFeeder.newRole, '@roleEditedTag');
    await deleteCreatedTags('@roleEditedTag', tagsFeeder.newRole);
  });

  test('cruding for Custom type', async () => {
    await createtags('@tagCategoryCustom', tagsFeeder.customName, '@customTag');
    await editCreatedTags('@customTag', tagsFeeder.newCustom, '@customEditedTag');
    await deleteCreatedTags('@customEditedTag', tagsFeeder.newCustom);
  });
});
