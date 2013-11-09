# -*- coding: utf-8 -*-

from tornado.web import RequestHandler

class HomeHandler(RequestHandler):
    def get(self):
        self.render('index.html')

class RedirectHandler(RequestHandler):
    def get(self):
        self.render('index.html')
