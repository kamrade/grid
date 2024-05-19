/*
//
// sortedBy
// sortedDirection
// filterQuery
//
 */

export interface CasesData {
  referenceId: string;
  assignee: string;
  customerName: string;
  createdOn: string;
  description: string;
  status: 'Pending' | 'InProgress' | 'Closed';
}

export const defaultColumnsSize = [320, 200, 200, 200, 320, 200];
export const minColumnSize = 100;

export const sortedByDefault = 'assignee';

export const sortDirectionDefault = 'asc';

export const casesColumns = [
  'referenceId',
  'assignee',
  'customerName',
  'createdOn',
  'description',
  'status'
];

interface ICasesColumnsMap {
  [key: string]: string;
}

export const casesColumnsMap: ICasesColumnsMap = {
  referenceId: 'Reference ID',
  assignee: 'Assignee',
  customerName: 'Customer Name',
  createdOn: 'Created on',
  description: 'Description',
  status: 'Status'
}

export const casesData: CasesData[] = [{
  referenceId: '52cd20f6-90c7-11ec-b909-0242ac120002',
  assignee: 'Nolan Culhane',
  customerName: 'Desirae Kenter',
  createdOn: '07-08-2021',
  description: 'It may comfort you to know that Fry\'s death took only fifteen seconds, yet the pain was so intense, that it felt to him like fifteen years. And it goes without saying, it caused him to empty his bowels. Five hours? Aw, man! Couldn\'t you just get me the death penalty?',
  status: 'Pending'
}, {
  referenceId: 'eb53ec6a-90c7-11ec-b909-0242ac120002',
  assignee: 'Gustavo Dokidis',
  customerName: 'Leo Kenter',
  createdOn: '05-08-2021',
  description: 'Fry, we have a crate to deliver. Oh, how awful. Did he at least die painlessly',
  status: 'Pending'
}, {
  referenceId: '0d3b86e4-90c8-11ec-b909-0242ac120002',
  assignee: 'Jordyn Dokidis',
  customerName: 'Makenna Dorwart',
  createdOn: '04-08-2021',
  description: 'When I was first asked to make a film about my nephew, Hubert Farnsworth, I thought "Why should I?" Then later, Leela made the film. But if I did make it, you can bet there would have been more topless women on motorcycles. Roll film! I had more, but you go ahead.',
  status: 'InProgress'
}, {
  referenceId: '287e2e66-90c8-11ec-b909-0242ac120002',
  assignee: 'Carla Vaccaro',
  customerName: 'Giana Korsgaard',
  createdOn: '03-08-2021',
  description: 'And when we woke up, we had these bodies.',
  status: 'Closed'
}, {
  referenceId: '13bb57e0-9188-11ec-b909-0242ac120002',
  assignee: 'Carter Siphron',
  customerName: 'Chance Lubin',
  createdOn: '03-08-2021',
  description: 'I didn\'t ask for a completely reasonable excuse! I asked you to get busy!',
  status: 'Closed'
}, {
  referenceId: '2c39f0ce-9188-11ec-b909-0242ac120002',
  assignee: 'Jordyn Vaccaro',
  customerName: 'Rayna Calzoni',
  createdOn: '01-08-2021',
  description: 'Throw her in the brig. We need rest. The spirit is willing, but the flesh is spongy and bruised. That\'s the ONLY thing about being a slave. Tell her you just want to talk. It has nothing to do with mating.',
  status: 'Closed'
}, {
  referenceId: '4a8e0ba0-9188-11ec-b909-0242ac120002',
  assignee: 'Phillip Dias',
  customerName: 'Erin Culhane',
  createdOn: '29-07-2021',
  description: 'Soon enough. Shinier than yours, meatbag. ',
  status: 'Closed'
}, {
  referenceId: '62cb37b0-9188-11ec-b909-0242ac120002',
  assignee: 'Zain Gouse',
  customerName: 'Jaydon Dorwart',
  createdOn: '28-07-2021',
  description: 'Kids don\'t turn rotten just from watching TV.',
  status: 'Closed'
}, {
  referenceId: '8237a2c8-9188-11ec-b909-0242ac120002',
  assignee: 'Nolan Mango',
  customerName: 'Craig Levin',
  createdOn: '25-07-2021',
  description: 'You hit me with a cricket bat. They\'re not aliens, they\'re Earth…liens! Aw, you\'re all Mr. Grumpy Face today. I\'m nobody\'s taxi service; I\'m not gonna be there to catch you every time you feel like jumping out of a spaceship.',
  status: 'Closed'
}, {
  referenceId: '9f85385e-9188-11ec-b909-0242ac120002',
  assignee: 'Giana Rhiel Madsen',
  customerName: 'Ruben Saris',
  createdOn: '21-07-2021',
  description: ' I won\'t stand for it. Not now, not ever, do you understand me?! I\'m the Doctor, the Oncoming Storm - and you basically meant beat them in a football match, didn\'t you?',
  status: 'Closed'

}]
