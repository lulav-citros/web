from tornado import gen
from IPython.utils.traitlets import Dict
from jupyterhub.auth import Authenticator

class CitrosAuthenticator(Authenticator):

    passwords = Dict(config=True,
        help="""dict of username:password for authentication"""
    )

    @gen.coroutine
    def authenticate(self, handler, data):
        return data['username']
#         if self.passwords.get(data['username']) == data['password']:
