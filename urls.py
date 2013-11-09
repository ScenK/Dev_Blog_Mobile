# -*- coding: utf-8 -*-
from mobile.handlers import *

urls = [
    (r'/', HomeHandler),
    (r'.*', RedirectHandler)
]
