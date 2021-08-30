const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { jwtVerify } = require('../helpers');
const { auth, member } = require('../middleware');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users/:input', auth, require('./users').fetchUsers);
router.post('/users/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({
    min: 6
  })
], require('./users').createUser);

router.post('/lists/', [auth, member, [check('title', 'Title is required').not().isEmpty()]], require('./lists').createList);
router.get('/lists/boardLists/:boardId', auth, require('./lists').getBoardAllLists);
router.get('/lists/:id', auth, require('./lists').getListById);
router.patch('/lists/rename/:id', [auth, member, [check('title', 'Title is required').not().isEmpty()]], require('./lists').updateListById);
router.patch('/lists/archive/:archive/:id', [auth, member], require('./lists').archiveList);
router.patch('/lists/move/:id', [auth, member], require('./lists').moveList);

router.post('/checklists/:cardId', [auth, member, [check('text', 'Text is required').not().isEmpty()]], require('./checklists').addCheckListItem);
router.patch('/checklists/:cardId/:itemId', [auth, member, [check('text', 'Text is required').not().isEmpty()]], require('./checklists').updateCheckListItem);
router.patch('/checklists/:cardId/:complete/:itemId', [auth, member], require('./checklists').updateCheckListItemStatus);
router.delete('/checklists/:cardId/:itemId', [auth, member], require('./checklists').deleteCheckListItem);

router.post('/cards/', [auth, member, [check('title', 'Title is required').not().isEmpty()]], require('./cards').addCard);
router.get('/cards/listCards/:listId', auth, require('./cards').getAllCards);
router.get('/cards/:id', auth, require('./cards').getCardById);
router.patch('/cards/edit/:id', [auth, member], require('./cards').updateCardById);
router.patch('/cards/archive/:archive/:id', [auth, member], require('./cards').archiveCardById);
router.patch('/cards/move/:id', [auth, member], require('./cards').moveCardById);
router.put('/cards/addMember/:add/:cardId/:userId', [auth, member], require('./cards').manageMember);
router.delete('/cards/:listId/:id', [auth, member], require('./cards').deleteCardById);

router.post('/boards/', [auth, [check('title', 'Title is required').not().isEmpty()]], require('./boards').createBoard);
router.get('/boards/', auth, require('./boards').getUserBoard);
router.get('/boards/:id', auth, require('./boards').getBoardById);
router.get('/boards/activity/:boardId', auth, require('./boards').getBoardActivityById);
router.patch('/boards/rename/:id', [auth, member, [check('title', 'Title is required').not().isEmpty()]], require('./boards').updateBoard);
router.put('/boards/addMember/:userId', [auth, member], require('./boards').addMemberToBoard);

router.get('/auth/', auth, require('./auth').getAuth);
router.post('/auth/', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').exists()
], require('./auth').postAuth);

module.exports = router;
