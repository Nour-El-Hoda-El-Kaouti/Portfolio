### TP1: Analyse du trafic réseau

#### Objectif :

Se familiariser avec les outils de capture de trafic et savoir comment analyser ce trafic afin de comprendre le comportement du réseau et détecter d'éventuels problèmes ou intrusions.

#### Outils et Définitions :

- **TCPdump** : Un utilitaire en ligne de commande qui permet de capturer et d'analyser le trafic réseau en affichant l'information contenue dans les paquets circulant sur une interface réseau.
    
- **Wireshark** : Analyseur de protocoles réseau, il permet de capturer et d'explorer le trafic réseau grâce à une interface graphique, offrant ainsi des détails approfondis des données échangées.
    
- **Nmap** : Scanner de ports open source qui permet de découvrir les dispositifs sur un réseau, d'identifier les ports ouverts et de déterminer le système d'exploitation de chaque hôte.
    
#### Étapes et Commandes :

1. **Lancer TCPdump pour capturer le trafic** :

    ```
    tcpdump
    ```
    
    - **Explication** : Cette commande démarre la capture des paquets sur l'interface réseau par défaut. Les paquets seront affichés sur la console en temps réel.

2. **Effectuer un ping vers le serveur depuis un autre terminal (client)** :

    ```
    ping [adresse_IP_du_serveur]
    ```
    
    - **Explication** : Envoie des paquets ICMP à l'adresse IP spécifiée (adresse du serveur) pour tester la connectivité. Cela génère du trafic que TCPdump pourra capturer.

3. **Interrompre la capture de TCPdump** :
    
    - Utiliser `Ctrl + C` pour arrêter la capture en cours.
    - **Explication** : Cela arrête le programme TCPdump et affiche le résumé des paquets capturés dans la console.

4. **Afficher les paquets ICMP échangés entre le client et le serveur** :
 
    ```
    tcpdump -x -X -s 0 src host 192.168.143.131 and dst host 192.168.143.128 and icmp
    ```
    
    - **Explication** : Cette commande capture et affiche les paquets ICMP (comme ceux échangés lors d'un ping) entre les adresses IP spécifiées. L’option `-x` affiche les données en format hexadécimal, tandis que `-X` affiche également en ASCII. L’option `-s 0` capture la pleine longueur des paquets.

5. **Effectuer une analyse avec Nmap pour scanner le réseau** :

    ```
    nmap -sP [plage_d_IP]
    ```
    
    - **Explication** : Cette commande scanne le réseau local à la recherche de machines actives (celles qui répondent aux pings). L’option `-sP` indique que Nmap doit effectuer un scan ping pour identifier les hôtes actifs.

6. **Examiner les ports ouverts d'une machine spécifique** :

    ```
    nmap -sS [IP_de_la_machine]
    ```
    
    - **Explication** : Ce scan utilise la technique SYN pour détecter les ports ouverts sur la machine cible spécifiée. Il envoie des paquets SYN et analyse les réponses pour déterminer quels ports sont ouverts.
---
### TP2: Attaque Man in the Middle

#### Objectif :

Découvrir les attaques de type Man in the Middle (MitM) et apprendre à les exécuter à l'aide d'Ettercap, en comprenant comment intercepter et modifier le trafic réseau entre deux machines.
#### Outil et Définition :

- **Ettercap** : Un outil open source pour l'analyse de réseau et la mise en œuvre d'attaques de type Man in the Middle. Il permet aux utilisateurs d’intercepter, d’explorer et de modifier les paquets échangés entre deux hôtes sur un réseau.
#### Étapes et Commandes :

1. **Lancer Ettercap en mode graphique** :

    ```
    ettercap -G
    ```
    
    - **Explication** : Cette commande démarre l'interface graphique d'Ettercap, permettant une configuration plus intuitive des attaques MitM ainsi que la visualisation des hôtes connectés au réseau.
2. **Sélectionner le mode de reniflement** :
    
    - Dans l'interface Ettercap, aller à `Sniff → Unified sniffing`.
    - **Explication** : Cela permet de configurer Ettercap pour capturer le trafic réseau de manière unifiée sur l'ensemble de l'interface sélectionnée.
3. **Scanner pour découvrir les hôtes actifs sur le réseau** :
    
    - Naviguer vers `Hosts → Scan for hosts`.
    - **Explication** : Cette action recherche et identifie les dispositifs connectés au même réseau local que l’hôte exécutant Ettercap. Cela aidera à localiser les machines cibles de l'attaque.
4. **Ajouter des hôtes cibles** :
    
    - Sélectionner les hôtes cibles (généralement la machine de la victime et la passerelle) via `Hosts → Host list`.
    - **Explication** : Cela permet de choisir les machines sur lesquelles l’attaque MitM sera effectuée, en les ajoutant à une liste d'attaques.
5. **Configurer l'usurpation ARP** :

    ```
    MITM → Arp poisoning
    ```
    
    - **Explication** : Cette commande configure Ettercap pour usurper les demandes ARP, permettant à l'attaquant d'intercepter le trafic entre une machine cible et la passerelle. En répondant aux requêtes ARP des deux côtés, l'attaquant fait croire à chaque machine qu'il est l'autre.
6. **Démarrer le sniffing** :

    ```
    Start → Start sniffing
    ```
    
    - **Explication** : Cela commence l'interception des paquets qui circulent entre les machines ciblées. Ettercap commencera à afficher les paquets capturés dans l'interface.

7. **Modifier le fichier DNS pour réaliser une usurpation DNS (optionnelle)** :
    
    - Éditer le fichier de configuration `etter.dns` pour rediriger certains sites web vers la machine de l'attaquant.
    - **Explication** : Cela permet de rediriger le trafic d'un site réputé vers un hôte malveillant, conduisant à une possible exfiltration d'informations ou à des attaques ciblant les utilisateurs.
---
### TP3: Sécuriser un serveur SSH

#### Objectif :

Renforcer la sécurité d'un serveur SSH (Secure Shell) afin de protéger le système contre les intrusions et les accès non autorisés.
#### Outils et Définition :

- **OpenSSH Server** : Logiciel serveur qui permet d'établir des connexions SSH sécurisées à distance. SSH utilise un cryptage fort pour sécuriser les connexions et les transfert de données.
#### Étapes et Commandes :

1. **Installer OpenSSH Server** :

    ```
    sudo apt update
    sudo apt upgrade
    sudo apt install openssh-server
    ```
    
    - **Explication** :
        - `sudo apt update` : Met à jour la liste des paquets disponibles pour le système.
        - `sudo apt upgrade` : Met à jour tous les paquets installés vers leur dernière version.
        - `sudo apt install openssh-server` : Installe le serveur OpenSSH, permettant ainsi l'établissement de connexions SSH.
    
2. **Vérifier que le service SSH est en cours d'exécution** :

    ```
    sudo systemctl status ssh
    ```
    
    - **Explication** : Affiche l'état du service SSH pour vérifier s'il est actif et fonctionnel. Cela permet de s'assurer que le serveur est prêt à accepter des connexions.
    
3. **Configurer le pare-feu pour autoriser les connexions SSH** :
  
    ```
    sudo ufw allow ssh
    sudo ufw enable
    sudo ufw status
    ```
    
    - **Explication** :
        - `sudo ufw allow ssh` : Ajoute une règle au pare-feu pour permettre les connexions SSH, utilisant le port 22 par défaut.
        - `sudo ufw enable` : Active le pare-feu UFW (Uncomplicated Firewall).
        - `sudo ufw status` : Affiche l'état actuel du pare-feu et les règles en vigueur.
    
4. **Modifier la configuration de SSH pour améliorer la sécurité** :

    ```
    sudo nano /etc/ssh/sshd_config
    ```
    
    - **Explication** : Ouvre le fichier de configuration du serveur SSH dans l'éditeur de texte `nano`. Vous pouvez modifier les paramètres pour renforcer la sécurité, par exemple :
        - Désactiver l'accès par mot de passe en utilisant des clés SSH.
        - Changer le port par défaut (22) pour un autre port moins évident.
        - Bloquer l’accès à l'utilisateur root.
    
5. **Créer une paire de clés SSH** :

    ```
    ssh-keygen -t rsa -b 4096 -f $HOME/.ssh/vps-cloud.web-server.key -C "My web-server key"
    ```
    
    - **Explication** :
        - `ssh-keygen` : Utilitaire pour générer une paire de clés SSH.
        - `-t rsa` : Spécifie le type de clé (RSA ici).
        - `-b 4096` : Définit la longueur de la clé à 4096 bits, offrant une sécurité accrue.
        - `-f` : Spécifie le chemin où la clé sera enregistrée.
        - `-C` : Ajoute un commentaire pour identifier la clé.
    
6. **Copier la clé publique sur le serveur** :

    ```
    ssh-copy-id -i $HOME/.ssh/vps-cloud.web-server.key.pub user@192.168.143.xxx
    ```
    
    - **Explication** : Cette commande copie la clé publique générée sur le serveur distant pour permettre l'authentification SSH par clé au lieu de mot de passe. Remplacez `user` par le nom de l'utilisateur et `192.168.143.xxx` par l'adresse IP du serveur.
    
7. **Testez la connexion SSH** :

    ```
    ssh -i $HOME/.ssh/vps-cloud.web-server.key user@192.168.143.xxx
    ```
    
    - **Explication** : Cette commande établit une connexion SSH en utilisant la clé privée spécifiée, permettant de s'assurer que la configuration fonctionne correctement.
---
### TP4 StrongSwan

L'objectif de ce TP est de configurer deux machines virtuelles Ubuntu en tant que routeurs pour établir une communication sécurisée via **IPSec** en utilisant **StrongSwan**. Le but est de créer un tunnel IPSec entre les deux routeurs afin que les réseaux LAN de chaque routeur puissent communiquer de manière sécurisée.

---
### Définitions

1. **IPSec (Internet Protocol Security)** : Protocole utilisé pour sécuriser les communications IP en fournissant des services de chiffrement, d'authentification et d'intégrité des données.
    
2. **StrongSwan** : Une implémentation open source d'IPSec et IKE (Internet Key Exchange) pour Linux.
    
3. **Netplan** : Un outil de configuration réseau utilisé dans les systèmes Ubuntu pour gérer les interfaces réseau.
    
4. **Tunnel IPSec** : Un tunnel sécurisé entre deux réseaux ou deux machines, permettant de chiffrer les données transitant entre eux.
    
---
### Étapes et Commandes Exécutées

#### 1. **Conception de l'Architecture**

- **Router1** :
    
    - Interface LAN : `192.168.1.1/24`
        
    - Interface WAN : `10.0.0.1/24`
        
- **Router2** :
    
    - Interface LAN : `192.168.2.1/24`
        
    - Interface WAN : `10.0.0.2/24`
        
#### 2. **Configuration des Interfaces Réseau avec Netplan**

- **Sur Router1** :
    
    - Édition du fichier `/etc/netplan/01-netcfg.yaml` pour configurer les interfaces réseau.

```
sudo netplan apply
```

- **Explication** : Applique la configuration réseau définie dans le fichier Netplan.

- **Sur Router2** :
    
    - Édition du fichier `/etc/netplan/01-netcfg.yaml` pour configurer les interfaces réseau.

  ```
  sudo netplan apply
  ```

    **Explication** : Applique la configuration réseau définie dans le fichier Netplan.
            

#### 3. **Configurer Ubuntu en tant que Routeur**

- **Sur Router1** :
    
    - Activation du forwarding IP :
    ```
    sudo sysctl -w net.ipv4.ip_forward=1
    ```
        
    **Explication** : Active le transfert de paquets IP pour permettre au système de fonctionner comme un routeur.
    
    - Ajout d'une route pour le réseau LAN de Router2 :
	    
        ``` 
          sudo ip route add 192.168.2.0/24 via 10.0.0.2 dev eth1
        ```
        
        - **Explication** : Ajoute une route statique pour le réseau `192.168.2.0/24` via l'interface `eth1`.
    
- **Sur Router2** :
    
    - Activation du forwarding IP :

        ```
        sudo sysctl -w net.ipv4.ip_forward=1
        ```
        
        - **Explication** : Active le transfert de paquets IP pour permettre au système de fonctionner comme un routeur.
        
    - Ajout d'une route pour le réseau LAN de Router1 :
    
        ```
        sudo ip route add 192.168.1.0/24 via 10.0.0.1 dev eth1
		```
        
        - **Explication** : Ajoute une route statique pour le réseau `192.168.1.0/24` via l'interface `eth1`.
#### 4. **Installation et Configuration de StrongSwan**

- **Installation de StrongSwan** :
    
    - Commande :
        
		```
		sudo apt update
        sudo apt install strongswan
		``` 

        - **Explication** : Met à jour les paquets et installe StrongSwan sur les deux routeurs.
            
- **Configuration sur Router1** :
    
    - Édition du fichier `/etc/ipsec.conf` pour configurer le tunnel IPSec.
        
    - Édition du fichier `/etc/ipsec.secrets` pour définir la clé pré-partagée (PSK).
        
    - Commande :
        
        ``` 
        sudo systemctl restart strongswan
		```

        - **Explication** : Redémarre le service StrongSwan pour appliquer les modifications.

- **Configuration sur Router2** :
    
    - Édition du fichier `/etc/ipsec.conf` pour configurer le tunnel IPSec.
        
    - Édition du fichier `/etc/ipsec.secrets` pour définir la clé pré-partagée (PSK).
        
    - Commande :
        
        ```
        sudo systemctl restart strongswan
		```

        - **Explication** : Redémarre le service StrongSwan pour appliquer les modifications.
#### 5. **Démarrage du Tunnel IPSec**

- Commande :
    ```
    sudo ipsec status
	```
    
    - **Explication** : Vérifie l'état du tunnel IPSec pour s'assurer qu'il est actif.
        
#### 6. **Test de la Communication IPSec**

- **Sur Router1** :
    
    - Commande :
        ```
        ping 192.168.2.1
		```     

        - **Explication** : Teste la connectivité avec une machine dans le réseau LAN de Router2.
            
- **Sur Router2** :
    
    - Commande :
        ```
        ping 192.168.1.1
		```
        
        - **Explication** : Teste la connectivité avec une machine dans le réseau LAN de Router1.