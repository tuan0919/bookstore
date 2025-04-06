// jenkins/init.groovy.d/setup.groovy
import jenkins.model.*
import hudson.model.*
import hudson.slaves.*

def instance = Jenkins.getInstance()

// Tạo User admin với API Token
def jenkinsUser = instance.securityRealm.createAccount("admin", "admin")
jenkinsUser.save()

// Lấy API Token
def apiToken = jenkinsUser.getProperty(jenkins.security.ApiTokenProperty.class).getApiToken()
println("API Token: ${apiToken}")

// Tạo Node (Agent)
def node = new DumbSlave(
    "front-end", "/home/jenkins/agent", new JNLPLauncher()
)
node.setNumExecutors(1)
node.setMode(Node.Mode.NORMAL)
node.setRetentionStrategy(new RetentionStrategy.Always())

instance.addNode(node)
instance.save()
println("🚀 Agent 'front-end' đã được tạo!")
