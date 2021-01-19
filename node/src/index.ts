import express from 'express';
import WebSocket from 'ws';
import { json } from 'body-parser';
import http from 'http';
import cors from 'cors';
import { updateLanguageServiceSourceFile } from 'typescript';

interface Room {
  user1: string;
  user2?: string;
  id: string;
  pack: any;
  user1ready?: boolean;
  user2ready?: boolean;
  user1client?: WebSocket;
  user2client?: WebSocket;
  user1score?: number;
  user2score?: number;
}

var roomList: Room[] = [];

const app = express();
app.use(json());
app.use(cors());

app.get('/list', (req, res) => {
  res.status(200).send(roomList);
});

app.post('/room', (req, res) => {
  var { room } = req.body;
  roomList.push(room);
  res.status(201).send({});
  console.log(roomList);
});

app.get('/getroom/:id', (req, res) => {
  var free;
  var room = roomList.filter((room) => req.params.id == room.id);
  if (room.length == 0) {
    free = true;
  } else if (!room[0].user2) {
    free = true;
  } else {
    free = false;
  }
  res.status(200).send({ free });
});

app.get('*', (req, res) => {
  res.status(404).send({});
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (client) => {
  console.log('connected');
  client.on('message', (message: string) => {
    const msg = JSON.parse(message);
    if (msg.message === 'start') {
      var room = roomList.filter(
        (room) => room.user1client == client || room.user2client == client
      )[0];
      if (room.user1client == client) {
        room.user1ready = true;
      } else if (room.user2client == client) {
        room.user2ready = true;
      }
      if (room.user1ready && room.user2ready) {
        room.user1client?.send(JSON.stringify({ message: 'go' }));
        room.user2client?.send(JSON.stringify({ message: 'go' }));
      }
    } else if (msg.message === 'room') {
      var room: Room;
      if (roomList.filter((r) => r.id == msg.room.id).length > 0) {
        room = roomList.filter((r) => r.id == msg.room.id)[0];
        room.user2 = msg.room.user1;
        room.user2client = client;
        client.send(JSON.stringify({ message: 'pack', pack: room.pack }));
      } else {
        room = msg.room as Room;
        room.user1client = client;
        roomList.push(room);
      }
      console.log(roomList);
    } else if (msg.message === 'words') {
      const words = msg.words;
      var score = 0;
      var goodWords = 0;
      var room = roomList.filter(
        (room) => room.user1client == client || room.user2client == client
      )[0];
      room.pack.words.map(
        (word: { from: string; to: string }, index: number) => {
          if (word.to == words[index].word) {
            score += words[index].timeleft;
            goodWords += 1;
          } else {
            score += 0;
          }
        }
      );
      score = (score / words.length) * (goodWords / words.length);
      if (client == room.user1client) {
        room.user1score = score;
      } else if (client == room.user2client) {
        room.user2score = score;
      }
      if (room.user1score != undefined && room.user2score != undefined) {
        var scoremessage;
        if (client == room.user1client) {
          scoremessage = JSON.stringify({
            message: 'score',
            yscore: room.user1score,
            oscore: room.user2score,
          });
          room.user1client?.send(scoremessage);
          scoremessage = JSON.stringify({
            message: 'score',
            yscore: room.user2score,
            oscore: room.user1score,
          });
          room.user2client?.send(scoremessage);
        } else if (client == room.user2client) {
          scoremessage = JSON.stringify({
            message: 'score',
            yscore: room.user1score,
            oscore: room.user2score,
          });
          room.user1client?.send(scoremessage);
          scoremessage = JSON.stringify({
            message: 'score',
            yscore: room.user2score,
            oscore: room.user1score,
          });
          room.user2client?.send(scoremessage);
        }
      }
    }
  });
  client.on('close', (code) => {
    roomList = roomList.filter((room) => {
      if (room.user1client == client || room.user2client == client) {
        room.user1client?.send(JSON.stringify({ message: 'breakGame' }));
        room.user2client?.send(JSON.stringify({ message: 'breakGame' }));
        return;
      } else {
        return room;
      }
    });
    console.log('Disconected client: ' + code.toString(), roomList);
  });
});

server.listen(3333, () => {
  console.log('Web Socket Server listening on 3333');
});
